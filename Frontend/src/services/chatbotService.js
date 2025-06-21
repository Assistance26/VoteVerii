import axios from 'axios';

export async function sendMessageToChatbot(question) {
  const response = await axios.post('/api/chatbot/ask', { question });
  return response.data.answer; 
}
