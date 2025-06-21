const axios = require('axios');

const OLLAMA_LOCAL_URL = 'http://localhost:11434/api/generate';

async function getSummaryFromOllama(prompt) {
  try {
    const response = await axios.post(
      OLLAMA_LOCAL_URL,
      {
        model: 'mistral',  // or llama3, depending on what you have pulled locally
        prompt,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Local Ollama returns text in `response.data.response`
    return response.data.response || 'No summary returned';
  } catch (error) {
    console.error('Ollama local API error:', error);
    throw new Error('Failed to get summary from local Ollama');
  }
}

module.exports = {
  getSummaryFromOllama,
};
