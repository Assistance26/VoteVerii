// // src/components/ToxicityChecker.jsx
// import React, { useEffect, useState } from 'react';
// import * as toxicity from '@tensorflow-models/toxicity';
// import '@tensorflow/tfjs'; // Required for TensorFlow.js

// export default function ToxicityChecker({ text, onToxicityResults }) {
//   const [model, setModel] = useState(null);
//   const threshold = 0.9;

//   useEffect(() => {
//     // Load model once on mount
//     toxicity.load(threshold).then((loadedModel) => {
//       setModel(loadedModel);
//     });
//   }, []);

//   useEffect(() => {
//     if (model && text.trim()) {
//       model.classify([text]).then((predictions) => {
//         const toxicLabels = predictions
//           .filter((p) => p.results[0].match)
//           .map((p) => ({
//             label: p.label,
//             probability: p.results[0].probabilities[1],
//           }));
//         onToxicityResults(toxicLabels);
//       });
//     } else {
//       onToxicityResults([]);
//     }
//   }, [text, model]);

//   return (
//     <div>
//       <h3 className="text-lg font-bold text-indigo-600 mb-2">Toxicity Analysis</h3>
//       {model ? (
//         <p className="text-sm text-gray-700">Model loaded. Analyzing...</p>
//       ) : (
//         <p className="text-sm text-gray-500">Loading model...</p>
//       )}
//     </div>
//   );
// }

// components/ToxicityChecker.jsx
import React, { useEffect, useState } from "react";
import * as toxicity from "@tensorflow-models/toxicity";

export default function ToxicityChecker({ text, onToxicityResults }) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!text.trim()) {
      setPredictions([]);
      onToxicityResults([]); // Clear results if no text
      return;
    }

    const checkToxicity = async () => {
      setLoading(true);
      try {
        const threshold = 0.9;
        const model = await toxicity.load(threshold);
        const results = await model.classify([text]);
        setPredictions(results);
        onToxicityResults(results); // send results to parent
      } catch (err) {
        console.error("Toxicity model failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkToxicity();
  }, [text, onToxicityResults]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Toxicity Analysis</h2>
      {loading ? (
        <p className="text-indigo-500">Analyzing...</p>
      ) : predictions.length > 0 ? (
        <ul className="list-disc ml-5 text-sm">
          {predictions.map((p) => (
            <li key={p.label}>
              <strong>{p.label}:</strong>{" "}
              {p.results[0].match ? (
                <span className="text-red-600 font-bold">⚠️ Toxic</span>
              ) : (
                <span className="text-green-600">Not toxic</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No results to display.</p>
      )}
    </div>
  );
}