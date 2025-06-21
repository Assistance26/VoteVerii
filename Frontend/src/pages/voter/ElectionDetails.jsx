import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaVoteYea } from "react-icons/fa";

const ElectionDetails = () => {
  const { contract, account } = useWallet();
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [hasVotedFor, setHasVotedFor] = useState(null);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    const fetchElectionDetails = async () => {
      if (!contract || !account) return;

      try {
        const result = await contract.methods.getAllElections().call({ from: account });
        const index = result.ids.findIndex((eid) => Number(eid) === Number(id));
        if (index === -1) return;

        const candidates = result.candidateNames[index].map((name, cIdx) => ({
          name,
          approved: result.candidateApprovals[index][cIdx],
          address: result.candidateAddresses[index][cIdx],
        }));

        const e = {
          id: Number(result.ids[index]),
          name: result.names[index],
          position: result.positions[index],
          candidateDeadline: Number(result.candidateDeadlines[index]),
          startTime: Number(result.startTimes[index]),
          endTime: Number(result.endTimes[index]),
          votingClosed: result.votingClosedFlags[index],
          candidates,
        };

        setElection(e);

        const voted = await contract.methods.hasVoted(Number(id), account).call();
        if (voted) {
          for (let i = 0; i < candidates.length; i++) {
            const votes = await contract.methods.getVotes(Number(id), candidates[i].name).call();
            const prevVotes = parseInt(votes);
            if (prevVotes > 0) {
              setHasVotedFor(candidates[i].address);
              break;
            }
          }
        }
      } catch (err) {
        console.error("Error loading election details", err);
      }
    };

    fetchElectionDetails();
  }, [contract, account, id]);

  if (!election)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#00111a] to-black text-cyan-400 font-semibold text-lg animate-pulse">
        Loading election details...
      </div>
    );

  const now = Date.now() / 1000;
  const votingActive = now >= election.startTime && now <= election.endTime && !election.votingClosed;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00111a] to-black flex flex-col justify-center px-6 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto bg-gradient-to-tr from-cyan-900/60 via-cyan-900/40 to-cyan-900/10 backdrop-blur-md border border-cyan-500 rounded-3xl shadow-lg p-10 text-white">

        {/* Election Name - same style as Position */}
        <p className="text-xl mb-3">
          <span className="font-semibold">Election Name:</span> {election.name}
        </p>

        <p className="text-xl mb-3">
          <span className="font-semibold">Position:</span> {election.position}
        </p>
        
        <p className="text-xl mb-3">
          <span className="font-semibold">Voting Period:</span>{" "}
          {new Date(election.startTime * 1000).toLocaleString()} -{" "}
          {new Date(election.endTime * 1000).toLocaleString()}
        </p>

        <p className="text-xl mb-8 flex items-center gap-3">
          <span className="font-semibold">Voting Closed:</span>
          {election.votingClosed ? (
            <span className="text-red-500 flex items-center gap-2">
              <FaTimesCircle /> Yes
            </span>
          ) : (
            <span className="text-green-400 flex items-center gap-2">
              <FaCheckCircle /> No
            </span>
          )}
        </p>

        <h3 className="text-3xl font-semibold mb-6 text-cyan-300">Approved Candidates</h3>
        <ul className="space-y-5">
          {election.candidates
            .filter((c) => c.approved)
            .map((c) => (
              <li
                key={c.address}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-gray-900/70 rounded-2xl border border-cyan-600 shadow-inner transition-shadow duration-300 hover:shadow-cyan-500/70"
              >
                <span className="text-2xl font-medium">{c.name}</span>

                <div className="mt-4 sm:mt-0 flex items-center gap-6">
                  {hasVotedFor === c.address ? (
                    <motion.span
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-700 text-white font-semibold select-none cursor-default shadow-lg"
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaVoteYea size={20} /> Voted
                    </motion.span>
                  ) : !hasVotedFor && votingActive ? (
                    <button
                      onClick={async () => {
                        try {
                          setIsVoting(true);
                          await contract.methods.vote(election.id, c.address).send({ from: account });
                          alert("✅ Vote submitted!");
                          setHasVotedFor(c.address);
                        } catch (err) {
                          console.error("Voting error:", err);
                          alert("❌ Voting failed.");
                        } finally {
                          setIsVoting(false);
                        }
                      }}
                      disabled={isVoting}
                      className="px-8 py-3 bg-green-600 hover:bg-green-700 active:bg-green-800 transition-colors rounded-xl text-white font-semibold flex items-center gap-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400"
                    >
                      {isVoting ? "Submitting..." : "Vote"}
                    </button>
                  ) : (
                    <span className="text-gray-400 italic select-none text-lg">
                      {votingActive ? "Waiting for your vote" : "Voting not available"}
                    </span>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ElectionDetails;