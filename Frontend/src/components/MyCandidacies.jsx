// import { useEffect, useState } from 'react';
// import { useWallet } from '../contexts/WalletContext';

// export default function MyCandidacies({ candidacies }) {
//   const { contract, account } = useWallet();
//   const [voteCounts, setVoteCounts] = useState({});

//   const fetchVotes = async () => {
//     const updatedVotes = {};
//     for (const election of candidacies) {
//       const candidate = election.candidates.find(
//         c => c.address.toLowerCase() === account.toLowerCase()
//       );

//       if (candidate && candidate.approved) {
//         try {
//           const votes = await contract.methods.getVotes(election.id, candidate.name).call();
//           updatedVotes[election.id] = votes;
//         } catch (err) {
//           updatedVotes[election.id] = 'Error';
//         }
//       }
//     }
//     setVoteCounts(updatedVotes);
//   };

//   useEffect(() => {
//     if (candidacies.length > 0) {
//       fetchVotes();
//     }
//   }, [candidacies]);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">My Candidacies</h2>
//       {candidacies.length === 0 ? (
//         <p className="text-gray-600 italic">You haven’t applied for any elections yet.</p>
//       ) : (
//         candidacies.map(election => {
//           const candidate = election.candidates.find(
//             c => c.address.toLowerCase() === account.toLowerCase()
//           );
//           const isApproved = candidate?.approved;

//           return (
//             <div key={election.id} className="border p-4 rounded mb-4">
//               <h3 className="text-lg font-bold">{election.name}</h3>
//               <p><strong>Position:</strong> {election.position}</p>
//               <p><strong>Candidacy Status:</strong> {isApproved ? '✅ Approved' : '⏳ Pending'}</p>
//               <p><strong>Voting Period:</strong> {new Date(election.startTime * 1000).toLocaleString()} - {new Date(election.endTime * 1000).toLocaleString()}</p>
//               <p><strong>Voting Closed:</strong> {election.votingClosed ? 'Yes' : 'No'}</p>
//               {isApproved && (
//                 <p><strong>Votes Received:</strong> {voteCounts[election.id] ?? 'Loading...'}</p>
//               )}
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { motion } from 'framer-motion';
import { FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function MyCandidacies({ candidacies }) {
  const { contract, account } = useWallet();
  const [voteCounts, setVoteCounts] = useState({});

  const fetchVotes = async () => {
    const updatedVotes = {};
    for (const election of candidacies) {
      const candidate = election.candidates.find(
        c => c.address.toLowerCase() === account.toLowerCase()
      );

      if (candidate && candidate.approved) {
        try {
          const votes = await contract.methods.getVotes(election.id, candidate.name).call();
          updatedVotes[election.id] = votes;
        } catch (err) {
          updatedVotes[election.id] = 'Error';
        }
      }
    }
    setVoteCounts(updatedVotes);
  };

  useEffect(() => {
    if (candidacies.length > 0) {
      fetchVotes();
    }
  }, [candidacies]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white p-6 rounded-xl shadow-md border"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">🎓 My Candidacies</h2>

      {candidacies.length === 0 ? (
        <p className="text-gray-500 italic">You haven’t applied for any elections yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {candidacies.map(election => {
            const candidate = election.candidates.find(
              c => c.address.toLowerCase() === account.toLowerCase()
            );
            const isApproved = candidate?.approved;
            const voteCount = voteCounts[election.id];

            return (
              <motion.div
                key={election.id}
                className="border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition duration-300 bg-gradient-to-br from-gray-50 to-white"
                whileHover={{ scale: 1.01 }}
              >
                <h3 className="text-xl font-bold text-indigo-700 mb-2">{election.name}</h3>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>🧭 Position:</strong> {election.position}
                </p>
                <p className="text-sm mb-1 flex items-center">
                  <strong className="mr-1">📌 Status:</strong>
                  {isApproved ? (
                    <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                      <FiCheckCircle className="mr-1" /> Approved
                    </span>
                  ) : (
                    <span className="text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
                      <FiClock className="mr-1" /> Pending
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>🗓️ Voting Period:</strong><br />
                  {new Date(election.startTime * 1000).toLocaleString()} → {new Date(election.endTime * 1000).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>🛑 Voting Closed:</strong> {election.votingClosed ? 'Yes' : 'No'}
                </p>
                {isApproved && (
                  <p className="text-sm text-indigo-700 font-medium">
                    <strong>🗳️ Votes Received:</strong>{' '}
                    {voteCount === undefined ? (
                      <span className="text-gray-500">Loading...</span>
                    ) : voteCount === 'Error' ? (
                      <span className="text-red-600 flex items-center"><FiAlertCircle className="mr-1" /> Error</span>
                    ) : (
                      voteCount
                    )}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
