// export default function ElectionCard({ election, actionLabel, onAction }) {
//   return (
//     <div className="border p-4 rounded-md shadow-md bg-white">
//       <h3 className="text-lg font-bold">{election.name}</h3>
//       <p className="text-sm text-gray-600">Position: {election.position}</p>
//       <p className="text-sm">Candidate Deadline: {new Date(election.candidateDeadline * 1000).toLocaleString()}</p>
//       <p className="text-sm">Voting: {new Date(election.startTime * 1000).toLocaleString()} to {new Date(election.endTime * 1000).toLocaleString()}</p>
//       <button
//         className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         onClick={onAction}
//       >
//         {actionLabel}
//       </button>
//     </div>
//   );
// }



import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiUserCheck } from 'react-icons/fi';

export default function ElectionCard({ election, actionLabel, onAction }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="border rounded-xl shadow-sm bg-gradient-to-br from-white to-gray-50 p-5 hover:shadow-lg transition-all duration-300"
    >
      <h3 className="text-xl font-semibold text-indigo-800 mb-1">{election.name}</h3>
      <p className="text-sm text-gray-700 mb-1 flex items-center">
        <FiUserCheck className="mr-2 text-indigo-500" />
        <strong className="mr-1">Position:</strong> {election.position}
      </p>

      <p className="text-sm text-gray-700 mb-1 flex items-center">
        <FiClock className="mr-2 text-indigo-500" />
        <strong className="mr-1">Candidate Deadline:</strong>{' '}
        {new Date(election.candidateDeadline * 1000).toLocaleString()}
      </p>

      <p className="text-sm text-gray-700 flex items-start">
        <FiCalendar className="mr-2 mt-0.5 text-indigo-500" />
        <span>
          <strong className="mr-1">Voting:</strong>
          {new Date(election.startTime * 1000).toLocaleString()} <br />
          → {new Date(election.endTime * 1000).toLocaleString()}
        </span>
      </p>

      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        onClick={onAction}
      >
        {actionLabel}
      </button>
    </motion.div>
  );
}
