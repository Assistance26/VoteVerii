// import React, { useEffect, useState } from "react";
// import { useWallet } from "../../contexts/WalletContext"; // update path based on your app

// export default function AdminCloseExpiredElections() {
//   const { contract, account } = useWallet();
//   const [expiredElections, setExpiredElections] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchElections = async () => {
//     if (!contract) return;
//     try {
//       const data = await contract.methods.getAllElections().call();
//       const currentTime = Math.floor(Date.now() / 1000);

//       const expired = [];
//       for (let i = 0; i < data[0].length; i++) {
//         const electionId = data[0][i];
//         const endTime = parseInt(data[5][i]);
//         const isClosed = data[6][i];

//         if (!isClosed && currentTime > endTime) {
//           expired.push(electionId);
//         }
//       }

//       setExpiredElections(expired);
//     } catch (err) {
//       console.error("Error fetching elections:", err);
//     }
//   };

//   const closeExpiredElections = async () => {
//     setLoading(true);
//     try {
//       for (let i = 0; i < expiredElections.length; i++) {
//         const id = expiredElections[i];
//         await contract.methods.closeVoting(id).send({ from: account });
//         console.log(`Closed election ${id}`);
//       }
//       alert("All expired elections have been closed.");
//       fetchElections(); // refresh list
//     } catch (err) {
//       console.error("Error closing elections:", err);
//       alert("Error closing elections.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//   if (contract) {
//     fetchElections();
//   }
// }, [contract]);


//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Close Expired Elections</h2>
//       {expiredElections.length === 0 ? (
//         <p>No expired elections to close.</p>
//       ) : (
//         <>
//           <ul className="list-disc ml-5 mb-4">
//             {expiredElections.map((id) => (
//               <li key={id}>Election ID: {id}</li>
//             ))}
//           </ul>
//           <button
//             onClick={closeExpiredElections}
//             disabled={loading}
//             className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             {loading ? "Closing..." : "Close All Expired Elections"}
//           </button>
//         </>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { FaClock, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminCloseExpiredElections() {
  const { contract, account } = useWallet();
  const [expiredElections, setExpiredElections] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchElections = async () => {
    if (!contract) return;
    try {
      const data = await contract.methods.getAllElections().call();
      const currentTime = Math.floor(Date.now() / 1000);

      const expired = [];
      for (let i = 0; i < data[0].length; i++) {
        const electionId = data[0][i];
        const endTime = parseInt(data[5][i]);
        const isClosed = data[6][i];

        if (!isClosed && currentTime > endTime) {
          expired.push(electionId);
        }
      }

      setExpiredElections(expired);
    } catch (err) {
      console.error("Error fetching elections:", err);
    }
  };

  const closeExpiredElections = async () => {
    setLoading(true);
    try {
      for (let i = 0; i < expiredElections.length; i++) {
        const id = expiredElections[i];
        await contract.methods.closeVoting(id).send({ from: account });
        console.log(`Closed election ${id}`);
      }
      alert("✅ All expired elections have been closed.");
      fetchElections();
    } catch (err) {
      console.error("Error closing elections:", err);
      alert("❌ Error closing elections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) fetchElections();
  }, [contract]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-6 border border-gray-300"
      >
        <div className="flex items-center space-x-3 mb-6">
          <FaClock className="text-indigo-600 text-2xl animate-pulse" />
          <h2 className="text-2xl font-extrabold text-gray-800">Close Expired Elections</h2>
        </div>

        <AnimatePresence>
          {expiredElections.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg text-sm flex items-center space-x-2"
            >
              <FaCheckCircle />
              <span>No expired elections found.</span>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4"
              >
                <p className="font-semibold text-red-800 mb-2">Expired Elections:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 pl-2">
                  {expiredElections.map((id) => (
                    <motion.li
                      key={id}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05 }}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      <span className="font-mono">{id}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.button
                onClick={closeExpiredElections}
                disabled={loading}
                whileTap={{ scale: 0.96 }}
                className={`w-full text-center py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow ${
                  loading
                    ? "bg-red-400 cursor-not-allowed text-white"
                    : "bg-red-600 hover:bg-red-700 text-white"
                }`}
              >
                {loading ? "Closing Expired Elections..." : "Close All Expired Elections"}
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
