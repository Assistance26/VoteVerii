// import { useEffect, useState } from 'react';
// import { useWallet } from '../../contexts/WalletContext';
// import ElectionCard from '../../components/ElectionCard';
// import MyCandidacies from '../../components/MyCandidacies'; 

// export default function ParticipateElection() {
//   const { contract, account } = useWallet();
//   const [elections, setElections] = useState([]);
//   const [appliedElectionIds, setAppliedElectionIds] = useState([]);

//   const getAllElections = async () => {
//     try {
//       const result = await contract.methods.getAllElections().call({ from: account });

//       const parsed = result.ids.map((id, idx) => {
//         const candidates = result.candidateAddresses[idx].map((addr, cIdx) => ({
//           address: addr,
//           name: result.candidateNames[idx][cIdx],
//           approved: result.candidateApprovals[idx][cIdx]
//         }));

//         const applied = candidates.find(c => c.address.toLowerCase() === account.toLowerCase());

//         if (applied) {
//           setAppliedElectionIds(prev => [...prev, Number(id)]);
//         }

//         return {
//           id: Number(id),
//           name: result.names[idx],
//           position: result.positions[idx],
//           candidateDeadline: Number(result.candidateDeadlines[idx]),
//           startTime: Number(result.startTimes[idx]),
//           endTime: Number(result.endTimes[idx]),
//           votingClosed: result.votingClosedFlags[idx],
//           candidates,
//         };
//       });

//       setElections(parsed);
//     } catch (err) {
//       console.error('Failed to load elections:', err);
//     }
//   };

//   const handleRequestCandidacy = async (electionId) => {
//     try {
//       const candidateName = prompt('Enter your candidate name:');
//       if (!candidateName) return;
//       await contract.methods.requestCandidacy(electionId, candidateName).send({ from: account });
//       alert('Candidacy requested successfully!');
//       getAllElections(); // refresh list
//     } catch (err) {
//       console.error('Candidacy request failed:', err);
//       alert('Candidacy request failed: ' + err.message);
//     }
//   };

//   useEffect(() => {
//     if (contract && account) getAllElections();
//   }, [contract, account]);

//   const now = Date.now() / 1000;

//   const filteredElections = elections.filter(
//     e => e.candidateDeadline > now && !appliedElectionIds.includes(e.id)
//   );

//   const myCandidacies = elections.filter(
//     e => appliedElectionIds.includes(e.id)
//   );

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">Apply for Candidacy</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
//         {filteredElections.length === 0 ? (
//           <p>No elections available for candidacy.</p>
//         ) : (
//           filteredElections.map((election) => (
//             <ElectionCard
//               key={election.id}
//               election={election}
//               actionLabel="Request Candidacy"
//               onAction={() => handleRequestCandidacy(election.id)}
//             />
//           ))
//         )}
//       </div>

//       <MyCandidacies candidacies={myCandidacies} />
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import ElectionCard from '../../components/ElectionCard';
import MyCandidacies from '../../components/MyCandidacies';
import { motion } from 'framer-motion';
import { FiUserPlus } from 'react-icons/fi';

export default function ParticipateElection() {
  const { contract, account } = useWallet();
  const [elections, setElections] = useState([]);
  const [appliedElectionIds, setAppliedElectionIds] = useState([]);

  const getAllElections = async () => {
    try {
      const result = await contract.methods.getAllElections().call({ from: account });

      const parsed = result.ids.map((id, idx) => {
        const candidates = result.candidateAddresses[idx].map((addr, cIdx) => ({
          address: addr,
          name: result.candidateNames[idx][cIdx],
          approved: result.candidateApprovals[idx][cIdx]
        }));

        const applied = candidates.find(c => c.address.toLowerCase() === account.toLowerCase());

        if (applied) {
          setAppliedElectionIds(prev => [...prev, Number(id)]);
        }

        return {
          id: Number(id),
          name: result.names[idx],
          position: result.positions[idx],
          candidateDeadline: Number(result.candidateDeadlines[idx]),
          startTime: Number(result.startTimes[idx]),
          endTime: Number(result.endTimes[idx]),
          votingClosed: result.votingClosedFlags[idx],
          candidates,
        };
      });

      setElections(parsed);
    } catch (err) {
      console.error('Failed to load elections:', err);
    }
  };

  const handleRequestCandidacy = async (electionId) => {
    try {
      const candidateName = prompt('Enter your candidate name:');
      if (!candidateName) return;
      await contract.methods.requestCandidacy(electionId, candidateName).send({ from: account });
      alert('✅ Candidacy requested successfully!');
      getAllElections();
    } catch (err) {
      console.error('Candidacy request failed:', err);
      alert('❌ Candidacy request failed: ' + err.message);
    }
  };

  useEffect(() => {
    if (contract && account) getAllElections();
  }, [contract, account]);

  const now = Date.now() / 1000;

  const filteredElections = elections.filter(
    e => e.candidateDeadline > now && !appliedElectionIds.includes(e.id)
  );

  const myCandidacies = elections.filter(
    e => appliedElectionIds.includes(e.id)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Section: Apply for Candidacy */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 rounded-xl shadow-lg border mb-10"
      >
        <div className="flex items-center space-x-3 mb-4">
          <FiUserPlus className="text-indigo-600 text-xl" />
          <h2 className="text-2xl font-semibold text-gray-800">Apply for Candidacy</h2>
        </div>

        {filteredElections.length === 0 ? (
          <p className="text-gray-500 text-sm">No elections available for candidacy.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredElections.map((election) => (
              <motion.div
                key={election.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <ElectionCard
                  election={election}
                  actionLabel="Request Candidacy"
                  onAction={() => handleRequestCandidacy(election.id)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Section: My Candidacies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-xl shadow-md border"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Active Candidacies</h2>
        <MyCandidacies candidacies={myCandidacies} />
      </motion.div>
    </div>
  );
}
