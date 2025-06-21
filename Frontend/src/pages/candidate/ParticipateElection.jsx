import { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import ElectionCard from '../../components/ElectionCard';
import MyCandidacies from '../../components/MyCandidacies'; 

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
      alert('Candidacy requested successfully!');
      getAllElections(); // refresh list
    } catch (err) {
      console.error('Candidacy request failed:', err);
      alert('Candidacy request failed: ' + err.message);
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
    <div>
      <h2 className="text-xl font-semibold mb-4">Apply for Candidacy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {filteredElections.length === 0 ? (
          <p>No elections available for candidacy.</p>
        ) : (
          filteredElections.map((election) => (
            <ElectionCard
              key={election.id}
              election={election}
              actionLabel="Request Candidacy"
              onAction={() => handleRequestCandidacy(election.id)}
            />
          ))
        )}
      </div>

      <MyCandidacies candidacies={myCandidacies} />
    </div>
  );
}