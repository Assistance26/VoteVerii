import { useEffect, useState } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye } from "react-icons/fi";

const ElectionList = () => {
  const { contract, account } = useWallet();
  const [elections, setElections] = useState([]);

  useEffect(() => {
    const fetchElections = async () => {
      if (!contract || !account) return;
      try {
        const result = await contract.methods.getAllElections().call({ from: account });
        const parsed = result.ids.map((id, idx) => ({
          id: Number(id),
          name: result.names[idx],
          position: result.positions[idx],
        }));
        setElections(parsed);
      } catch (err) {
        console.error("Failed to load elections", err);
      }
    };

    fetchElections();
  }, [contract, account]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 sm:px-10 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-4xl sm:text-5xl font-extrabold text-center text-cyan-400 mb-16 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] tracking-wide"
      >
        🗳️ Active Blockchain Elections
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {elections.map((e, index) => (
          <motion.div
            key={e.id}
            className="relative rounded-3xl border border-cyan-500/30 bg-white/10 backdrop-blur-md shadow-[0_0_40px_rgba(34,211,238,0.25)] p-6 sm:p-7 flex flex-col justify-between transition-all hover:scale-[1.035] hover:shadow-[0_0_55px_rgba(34,211,238,0.5)] cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.12, type: "spring", stiffness: 100 }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-2 text-cyan-100 tracking-wide">
                {e.name}
              </h3>
              <p className="text-base text-cyan-200 font-medium">
                Position: <span className="text-white/90">{e.position}</span>
              </p>
            </div>

            <Link
              to={`/voter/election-list/${e.id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-cyan-500/90 px-5 py-2.5 text-white font-semibold text-sm shadow-lg hover:bg-cyan-600 hover:shadow-cyan-700/80 active:scale-95 transition-all duration-200"
            >
              <FiEye className="text-lg" />
              View Details
            </Link>

            {/* Decorative glow */}
            <span className="absolute top-3 right-3 w-4 h-4 rounded-full bg-cyan-400/70 blur-md animate-pulse"></span>
            <span className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-cyan-300/60 blur-xl opacity-80"></span>
          </motion.div>
        ))}
      </div>

      {elections.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-32 text-cyan-300 text-lg font-medium animate-pulse select-none"
        >
          🚫 No elections available right now. Please check back soon!
        </motion.div>
      )}
    </div>
  );
};

export default ElectionList;