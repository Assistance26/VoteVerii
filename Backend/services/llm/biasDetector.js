import axios from 'axios';

/**
 * Analyzes input text for bias using an LLM and returns true if biased.
 * @param {string} text - The text to analyze.
 * @returns {Promise<boolean>} - A boolean indicating whether the text is biased.
 */
export async function detectBias(text) {
  try {
    const prompt = `Analyze the following text for bias. Respond with "true" if biased, "false" if neutral:\n\n"${text}"`;

    const response = await axios.post(
      process.env.OLLAMA_URL || 'http://localhost:11434/api/generate',
      {
        model: "mistral",
        prompt,
        stream: false
      }
    );

    const result = response.data.response.trim().toLowerCase();
    return result.includes("true");
  } catch (error) {
    console.error("Bias detection failed:", error);
    return false;
  }
}
