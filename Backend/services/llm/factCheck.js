import axios from 'axios';

/**
 * Sends a prompt to Ollama LLM for fact-checking the provided text.
 * @param {string} text - The statement to fact-check.
 * @returns {Promise<string>} - A string with the fact-checking response.
 */
export async function factCheck(text) {
  try {
    const prompt = `Fact-check the following statement and explain any inaccuracies:\n\n"${text}"`;

    const response = await axios.post(
      process.env.OLLAMA_URL || 'http://localhost:11434/api/generate',
      {
        model: "mistral", // You can change this to another Ollama model if needed
        prompt,
        stream: false
      }
    );

    return response.data.response.trim();
  } catch (error) {
    console.error("Fact check failed:", error);
    return "Error during fact-checking.";
  }
}
