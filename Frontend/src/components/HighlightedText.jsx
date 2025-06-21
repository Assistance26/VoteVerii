// File: src/components/HighlightedText.jsx
import React from "react";

export default function HighlightedText({ text, toxicityResults }) {
  const toxicLabels = toxicityResults
    .filter((item) => item.results[0].match)
    .map((item) => item.label.toLowerCase());

  if (!text) return null;

  return (
    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
      <h3 className="font-semibold text-yellow-700 mb-2">Highlighted Toxic Content:</h3>
      <p className="whitespace-pre-wrap text-gray-800">
        {text.split(" ").map((word, i) => {
          const lowerWord = word.toLowerCase();
          const isToxic = toxicLabels.some((label) => lowerWord.includes(label));
          return (
            <span
              key={i}
              className={isToxic ? "bg-red-200 text-red-800 font-semibold px-1" : ""}
            >
              {word}{" "}
            </span>
          );
        })}
      </p>
    </div>
  );
}