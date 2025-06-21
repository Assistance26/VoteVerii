const { answerStudentQuery } = require('../services/chatService');

async function handleStudentQuery(req, res) {
  try {
    const { question } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Invalid question format' });
    }

    const answer = await answerStudentQuery(question);
    return res.status(200).json({ answer });
  } catch (err) {
    console.error('[Chatbot Error]', err);
    return res.status(500).json({ error: 'Something went wrong while generating the answer.' });
  }
}

module.exports = {
  handleStudentQuery,
};
