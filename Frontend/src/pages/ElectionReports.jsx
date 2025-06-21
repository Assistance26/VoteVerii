// import { useEffect, useState } from "react";
// import { useWallet } from "../contexts/WalletContext";

// export default function ElectionReports() {
//   const { contract, account } = useWallet();
//   const [elections, setElections] = useState([]);
//   const [winners, setWinners] = useState({});

//   useEffect(() => {
//      if (!contract || !account) return;
//     const loadResults = async () => {
//       const results = await contract.methods.getAllElections().call({ from: account });
//       const {
//         ids,
//         names,
//         positions,
//         candidateDeadlines,
//         startTimes,
//         endTimes,
//         votingClosedFlags,
//         candidateNames,
//         candidateApprovals,
//         candidateAddresses,
//       } = results;

//       const completedElections = [];

//       for (let i = 0; i < ids.length; i++) {
//         if (!votingClosedFlags[i]) continue;

//         const candidates = candidateNames[i].map((name, idx) => ({
//           name,
//           approved: candidateApprovals[i][idx],
//           address: candidateAddresses[i][idx],
//         }));

//         completedElections.push({
//           id: Number(ids[i]),
//           name: names[i],
//           position: positions[i],
//           candidateDeadline: Number(candidateDeadlines[i]),
//           startTime: Number(startTimes[i]),
//           endTime: Number(endTimes[i]),
//           votingClosed: votingClosedFlags[i],
//           candidates,
//         });
//       }

//       setElections(completedElections);

//       const winnerMap = {};

//       for (const election of completedElections) {
//         let maxVotes = -1;
//         let winnerName = "";

//         for (const candidate of election.candidates) {
//           if (!candidate.approved) continue;

//           const voteCount = await contract.methods
//             .getVotes(election.id, candidate.name)
//             .call();

//           const votes = Number(voteCount);
//           if (votes > maxVotes) {
//             maxVotes = votes;
//             winnerName = candidate.name;
//           }
//         }

//         winnerMap[election.id] = {
//           name: winnerName,
//           votes: maxVotes,
//         };
//       }

//       setWinners(winnerMap);
//     };

//     loadResults();
//   }, [contract]);

//   if (!elections.length) return <p>No finished elections found.</p>;

//   return (
//     <div className="p-6 space-y-6">
//       {elections.map((election) => (
//         <div key={election.id} className="border rounded-md p-4 shadow-sm">
//           <h2 className="text-xl font-bold">
//             {election.name} ({election.position})
//           </h2>
//           <p className="mt-2">
//             <strong>Winner:</strong>{" "}
//             {winners[election.id]?.name || "No winner"} (
//             {winners[election.id]?.votes ?? 0} votes)
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ElectionReports() {
  const { contract, account } = useWallet();
  const [elections, setElections] = useState([]);
  const [summaries, setSummaries] = useState({});

  useEffect(() => {
    if (!contract || !account) return;

    const loadResults = async () => {
      const data = await contract.methods.getAllElections().call({ from: account });

      const {
        ids, names, positions,
        startTimes, endTimes, votingClosedFlags,
        candidateNames, candidateApprovals, candidateAddresses
      } = data;

      const detailedElections = [];
      const summaryMap = {};

      for (let i = 0; i < ids.length; i++) {
        if (!votingClosedFlags[i]) continue;

        const id = Number(ids[i]);
        const candidates = [];

        let totalVotes = 0;
        let maxVotes = -1;
        let winner = { name: "", votes: 0 };

        for (let j = 0; j < candidateNames[i].length; j++) {
          if (!candidateApprovals[i][j]) continue;

          const name = candidateNames[i][j];
          const addr = candidateAddresses[i][j];
          const voteCount = Number(await contract.methods.getVotes(id, name).call());

          totalVotes += voteCount;

          if (voteCount > maxVotes) {
            maxVotes = voteCount;
            winner = { name, votes: voteCount };
          }

          candidates.push({
            name,
            address: addr,
            votes: voteCount,
          });
        }

        const electionData = {
          id,
          name: names[i],
          position: positions[i],
          startTime: Number(startTimes[i]),
          endTime: Number(endTimes[i]),
          candidates,
          totalVotes,
          winner,
        };

        detailedElections.push(electionData);

        // Get AI summary
        try {
          const response = await fetch("http://localhost:3000/api/election/summarize", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Summarize the following election:\n${JSON.stringify(electionData, null, 2)}`,
            }),
          
          });
          console.log("Response from AI summary API:", response);

          const result = await response.json();
          summaryMap[id] = result.summary || "No summary available.";
        } catch (err) {
          console.error(`Failed to get summary for election ${id}`, err);
          summaryMap[id] = "Failed to fetch summary.";
        }
      }

      setElections(detailedElections);
      setSummaries(summaryMap);
    };

    loadResults();
  }, [contract, account]);

  // Custom futuristic loader UI
  if (!elections.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-cyan-300 relative overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-10 animate-pulse bg-[radial-gradient(circle_at_1px_1px,rgba(0,255,255,0.3)_1px,transparent_0)] [background-size:20px_20px] z-0" />

        {/* AI Report Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-4 z-10 tracking-wider text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          🧠 GenAI Analysis Engine Running: Constructing Electoral Report...
        </motion.h2>

        {/* Glowing Scanner Circle */}
        <motion.div
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-[6px] border-cyan-400 border-t-transparent animate-spin z-10 shadow-[0_0_60px_15px_rgba(0,255,255,0.3)]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />

        {/* AI Pulse Text */}
        <motion.p
          className="mt-6 text-sm sm:text-base text-cyan-200 z-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          AI is analyzing votes, candidate stats, and generating summary reports...
        </motion.p>

        {/* Scanner Bars */}
        <motion.div
          className="absolute top-0 left-0 w-full h-[4px] bg-cyan-500/30"
          animate={{ y: ["0%", "100%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-0 w-full h-[4px] bg-cyan-500/20"
          animate={{ y: ["100%", "0%"] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 bg-gradient-to-br from-slate-900 to-gray-800 min-h-screen text-white">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-cyan-300 drop-shadow-lg">
        📊 Election Reports Dashboard
      </h1>

      {elections.map((election, index) => (
        <motion.div
          key={election.id}
          className="rounded-2xl border border-cyan-500 shadow-xl p-6 bg-gray-900 hover:shadow-cyan-500/40 transition-shadow duration-300"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h2 className="text-2xl font-bold mb-2 text-cyan-400">
            {election.name} <span className="text-sm text-gray-300">({election.position})</span>
          </h2>

          <p className="mb-1"><strong>Total Votes:</strong> {election.totalVotes}</p>
          <p className="mb-4"><strong>Winner:</strong> <span className="text-green-400">{election.winner.name}</span> ({election.winner.votes} votes)</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-gray-800 rounded-lg border border-gray-700">
              <thead>
                <tr className="bg-gray-700 text-left">
                  <th className="py-2 px-3">Candidate ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Votes</th>
                </tr>
              </thead>
              <tbody>
                {election.candidates.map((c) => (
                  <tr key={c.address} className="hover:bg-gray-700 transition-colors border-t border-gray-600">
                    <td className="py-2 px-3">{c.address}</td>
                    <td className="py-2 px-3">{c.name}</td>
                    <td className="py-2 px-3">{c.votes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="my-6">
            <Bar
              data={{
                labels: election.candidates.map((c) => c.name),
                datasets: [
                  {
                    label: "Votes",
                    data: election.candidates.map((c) => c.votes),
                    backgroundColor: "rgba(0, 255, 255, 0.6)",
                    borderColor: "cyan",
                    borderWidth: 1,
                    borderRadius: 5,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top", labels: { color: "#fff" } },
                  title: {
                    display: true,
                    text: "Votes per Candidate",
                    color: "#0ff",
                  },
                },
                scales: {
                  x: { ticks: { color: "#ccc" } },
                  y: { ticks: { color: "#ccc" } },
                },
              }}
            />
          </div>

          <motion.div
            className="p-4 mt-4 bg-cyan-950/60 rounded-lg border border-cyan-500 text-cyan-100 shadow-md hover:shadow-cyan-400/50 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="font-semibold mb-2">🤖 AI Summary</h3>
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {summaries[election.id] || "Loading summary..."}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}