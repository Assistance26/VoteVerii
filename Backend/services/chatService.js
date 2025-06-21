import fetch from 'node-fetch';

export async function answerStudentQuery(question) {
  const prompt = `Answer this question about candidates: ${question}`;

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'mistral',
      prompt,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error('Ollama API error');
  }

  const data = await response.json();
  return data.response;
}
