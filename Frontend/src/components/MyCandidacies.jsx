import { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';

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
    <div>
      <h2 className="text-xl font-semibold mb-4">My Candidacies</h2>
      {candidacies.length === 0 ? (
        <p className="text-gray-600 italic">You haven’t applied for any elections yet.</p>
      ) : (
        candidacies.map(election => {
          const candidate = election.candidates.find(
            c => c.address.toLowerCase() === account.toLowerCase()
          );
          const isApproved = candidate?.approved;

          return (
            <div key={election.id} className="border p-4 rounded mb-4">
              <h3 className="text-lg font-bold">{election.name}</h3>
              <p><strong>Position:</strong> {election.position}</p>
              <p><strong>Candidacy Status:</strong> {isApproved ? '✅ Approved' : '⏳ Pending'}</p>
              <p><strong>Voting Period:</strong> {new Date(election.startTime * 1000).toLocaleString()} - {new Date(election.endTime * 1000).toLocaleString()}</p>
              <p><strong>Voting Closed:</strong> {election.votingClosed ? 'Yes' : 'No'}</p>
              {isApproved && (
                <p><strong>Votes Received:</strong> {voteCounts[election.id] ?? 'Loading...'}</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
