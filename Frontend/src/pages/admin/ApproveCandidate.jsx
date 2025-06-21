import { useEffect, useState } from "react";
import { useWallet } from "../../contexts/WalletContext";
import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";

export default function ApproveCandidate() {
  const { contract, account } = useWallet();
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await contract.methods.getAllElections().call();
      const values = Array.isArray(res) ? res : Object.values(res);

      if (values.length < 10) throw new Error("Invalid election data format");

      const [
        ids,
        names,
        positions,
        candidateDeadlines,
        startTimes,
        endTimes,
        votingClosedFlags,
        candidateNames,
        candidateApprovals,
        candidateAddresses,
      ] = values;

      const structuredData = ids.map((id, idx) => ({
        id,
        name: names[idx],
        position: positions[idx],
        candidateDeadline: candidateDeadlines[idx],
        startTime: startTimes[idx],
        endTime: endTimes[idx],
        votingClosed: votingClosedFlags[idx],
        candidates:
          candidateNames[idx]?.map((name, i) => ({
            name,
            approved: candidateApprovals[idx][i],
            address: candidateAddresses[idx][i],
          })) ?? [],
      }));

      setElections(structuredData);
    } catch (error) {
      console.error("Failed to fetch elections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (contract) fetchData();
  }, [contract]);

  const approve = async (electionId, candidateAddress) => {
    try {
      await contract.methods
        .approveCandidate(electionId, candidateAddress)
        .send({ from: account });
      alert("✅ Candidate approved!");
      fetchData();
    } catch (err) {
      console.error("Approval failed:", err);
      alert("❌ Approval failed. Check console for error.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-cyan-300 text-lg animate-pulse mt-20">
        ⏳ Fetching Elections...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-6 py-10 space-y-10">
      <motion.h2
        className="text-4xl text-center font-bold text-cyan-400 mb-6 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✅ Candidate Approval Dashboard
      </motion.h2>

      {elections
        .filter((e) => e.candidates.some((c) => !c.approved))
        .map((election, index) => (
          <motion.div
            key={election.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-cyan-400/20 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-cyan-400/40 transition duration-300 hover:scale-[1.01]"
          >
            <h3 className="text-2xl font-bold text-cyan-200 mb-1">
              {election.name}
              <span className="ml-2 text-sm text-cyan-400 font-light">
                ({election.position})
              </span>
            </h3>
            <p className="text-sm text-cyan-100/70 mb-5">
              🆔 Election ID: <span className="font-mono">{election.id}</span>
            </p>

            {election.candidates.map(
              (cand, i) =>
                !cand.approved && (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    className="flex items-center justify-between bg-gradient-to-r from-cyan-800/50 to-cyan-700/40 border border-cyan-300/20 rounded-xl p-4 mb-3 shadow-sm"
                  >
                    <div>
                      <p className="text-lg font-semibold text-white">
                        {cand.name}
                      </p>
                      {cand.address && (
                        <p className="text-sm text-cyan-200 font-mono mt-1">
                          {cand.address}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => approve(election.id, cand.address)}
                      disabled={!cand.address}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50"
                    >
                      <FiCheckCircle className="text-xl" />
                      Approve
                    </button>
                  </motion.div>
                )
            )}
          </motion.div>
        ))}

      {elections.every((e) => e.candidates.every((c) => c.approved)) && (
        <p className="text-center text-cyan-300 text-lg mt-32 animate-pulse">
          🎉 All candidates have been approved!
        </p>
      )}
    </div>
  );
}