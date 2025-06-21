
import { motion } from "framer-motion";

export default function ReportCard({ toxicityResults, llmReport }) {
  return (
    <motion.div
      className="mt-6 p-4 border border-indigo-300 rounded-md bg-indigo-50 shadow-sm"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-3 text-indigo-700">Analysis Report</h2>

      <div>
        <h3 className="font-semibold mb-1">Toxicity Summary:</h3>
        {toxicityResults.length > 0 ? (
          <ul className="list-disc ml-5 text-gray-800">
            {toxicityResults.map(({ label, probability }) => {
              const match = probability > 0.5;
              return (
                <li
                  key={label}
                  className={match ? "text-red-600 font-semibold" : "text-green-700"}
                >
                  {label}: {match ? "Yes" : "No"} (Confidence: {(probability * 100).toFixed(1)}%)
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-green-700 font-medium ml-2">✅ No toxic content detected.</p>
        )}
      </div>

      <div className="mt-5">
        <h3 className="font-semibold mb-1">LLM Fact-Check & Bias Report:</h3>
        {llmReport && typeof llmReport === "object" ? (
          <div className="text-gray-900 whitespace-pre-wrap">
            <p><strong>Input Text:</strong> {llmReport.inputText}</p>
            <p><strong>Toxicity Score:</strong> {(llmReport.toxicityScore * 100).toFixed(2)}%</p>
            <p><strong>Biased:</strong> {llmReport.isBiased ? "Yes" : "No"}</p>
            <p><strong>Plagiarized:</strong> {llmReport.isPlagiarized ? "Yes" : "No"}</p>
            <p><strong>Fact Check:</strong> {llmReport.factCheck}</p>
            <p><strong>Reported at:</strong> {new Date(llmReport.createdAt).toLocaleString()}</p>
          </div>
        ) : (
          <p className="text-gray-600 italic">No LLM report available.</p>
        )}
      </div>
    </motion.div>
  );
}
