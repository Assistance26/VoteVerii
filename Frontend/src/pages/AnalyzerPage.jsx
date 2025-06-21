import React, { useState, useEffect } from "react";
import axios from "axios";
import * as toxicity from "@tensorflow-models/toxicity";
import "@tensorflow/tfjs"; // Important for TensorFlow.js

import TextInput from "../components/TextInput";
import ReportCard from "../components/ReportCard";
import { motion } from "framer-motion";
import { log } from "@tensorflow/tfjs";

export default function AnalyzerPage() {
  const [text, setText] = useState("");
  const [toxicityResults, setToxicityResults] = useState([]);
  const [llmReport, setLlmReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toxicityModel, setToxicityModel] = useState(null);
  const threshold = 0.9;

  // Load toxicity model once
  useEffect(() => {
    toxicity.load(threshold).then((model) => {
      setToxicityModel(model);
    });
  }, []);

  // Analyze text with model
  const runToxicityCheck = async (inputText) => {
    if (!toxicityModel || !inputText.trim()) return;
    const predictions = await toxicityModel.classify([inputText]);

    const toxicLabels = predictions
      .filter((p) => p.results[0].match)
      .map((p) => ({
        label: p.label,
        probability: p.results[0].probabilities[1],
      }));

    setToxicityResults(toxicLabels);
    console.log("Toxicity results:", toxicLabels);
  };

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setLlmReport(null);
    setToxicityResults([]);

    try {
      // 1. Call backend
      console.log("Calling backend with text:", text);
      
      const response = await axios.post("/api/analysis/analyze", { text });
      console.log("Backend response:", response.data);
      setLlmReport(response.data || "No report returned");

      // 2. Run frontend toxicity analysis
      await runToxicityCheck(text);
    } catch (err) {
      console.error("Error calling backend:", err);
      setError("Failed to analyze content. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-10 text-center tracking-wide drop-shadow-md">
        GenAI Campaign Content Analyzer
      </h1>

      <motion.div
        layout
        className="bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-xl shadow-md"
      >
        <TextInput
          text={text}
          setText={setText}
          onSubmit={handleAnalyze}
          loading={loading}
        />
      </motion.div>

      <motion.div
        layout
        className="mt-10 bg-white bg-opacity-70 backdrop-blur-md rounded-xl shadow-xl p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {loading ? (
          <motion.p
            className="text-center text-indigo-600 font-semibold"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Analyzing content, please wait...
          </motion.p>
        ) : error ? (
          <p className="text-center text-red-600 font-semibold">{error}</p>
        ) : (
          <ReportCard toxicityResults={toxicityResults} llmReport={llmReport} />
        )}
      </motion.div>
    </motion.div>
  );
}