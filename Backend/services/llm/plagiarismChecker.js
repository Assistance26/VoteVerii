import axios from 'axios';

/**
 * Checks if the input text is likely plagiarized using an LLM prompt.
 * @param {string} text - The text to evaluate for plagiarism.
 * @returns {Promise<boolean>} - A boolean indicating if plagiarism is suspected.
 */
export async function checkPlagiarism(text) {
  try {
    const prompt = `Determine if the following text seems plagiarized. Respond only with "true" or "false":\n\n"${text}"`;

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
    console.error("Plagiarism check failed:", error);
    return false;
  }
}
