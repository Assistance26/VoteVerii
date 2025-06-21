export default function ElectionCard({ election, actionLabel, onAction }) {
  return (
    <div className="border p-4 rounded-md shadow-md bg-white">
      <h3 className="text-lg font-bold">{election.name}</h3>
      <p className="text-sm text-gray-600">Position: {election.position}</p>
      <p className="text-sm">Candidate Deadline: {new Date(election.candidateDeadline * 1000).toLocaleString()}</p>
      <p className="text-sm">Voting: {new Date(election.startTime * 1000).toLocaleString()} to {new Date(election.endTime * 1000).toLocaleString()}</p>
      <button
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </div>
  );
}
