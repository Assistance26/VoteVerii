import React, { useEffect, useState } from "react";
import { useWallet } from "../../contexts/WalletContext"; // update path based on your app

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
      alert("All expired elections have been closed.");
      fetchElections(); // refresh list
    } catch (err) {
      console.error("Error closing elections:", err);
      alert("Error closing elections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (contract) {
    fetchElections();
  }
}, [contract]);


  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Close Expired Elections</h2>
      {expiredElections.length === 0 ? (
        <p>No expired elections to close.</p>
      ) : (
        <>
          <ul className="list-disc ml-5 mb-4">
            {expiredElections.map((id) => (
              <li key={id}>Election ID: {id}</li>
            ))}
          </ul>
          <button
            onClick={closeExpiredElections}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            {loading ? "Closing..." : "Close All Expired Elections"}
          </button>
        </>
      )}
    </div>
  );
}
