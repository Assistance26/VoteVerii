import { useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';

export default function CreateElection() {
  const { contract, account } = useWallet();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [regDeadline, setRegDeadline] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const create = async () => {
    if (!contract || !account) {
      alert("Wallet not connected or contract not available.");
      return;
    }

    try {
      await contract.methods
        .createElection(
          name,
          position,
          Date.parse(regDeadline) / 1000,
          Date.parse(startTime) / 1000,
          Date.parse(endTime) / 1000
        )
        .send({ from: account });

      console.log("Election creation called!");
      alert("✅ Election created successfully.");
    } catch (err) {
      console.error("Election creation failed:", err);
      alert("❌ Failed to create election. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-blue-950 transition-colors duration-500 ease-in-out">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl animate-fadeIn transform transition-all duration-700 hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800 dark:text-white">
          🗳 Create New Election
        </h2>

        <div className="space-y-5">
          {[
            { id: "name", label: "Election Name", value: name, setValue: setName, placeholder: "Enter election title" },
            { id: "position", label: "Position", value: position, setValue: setPosition, placeholder: "e.g. President, Secretary" },
            { id: "regDeadline", label: "Registration Deadline", value: regDeadline, setValue: setRegDeadline, type: "datetime-local" },
            { id: "startTime", label: "Voting Start Time", value: startTime, setValue: setStartTime, type: "datetime-local" },
            { id: "endTime", label: "Voting End Time", value: endTime, setValue: setEndTime, type: "datetime-local" },
          ].map(({ id, label, value, setValue, placeholder, type = "text" }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
              </label>
              <input
                id={id}
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
              />
            </div>
          ))}

          <button
            onClick={create}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            🚀 Create Election
          </button>
        </div>
      </div>
    </div>
  );
}