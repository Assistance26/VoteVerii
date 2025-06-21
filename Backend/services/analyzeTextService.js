// const { factCheck, detectBias, checkPlagiarism } = require('./llm');
const {factCheck} = require('../services/llm/factCheck');
const {detectBias} = require('../services/llm/biasDetector');
const {checkPlagiarism} = require('../services/llm/plagiarismChecker');


/**
 * Analyzes the given content and returns analysis data object
 * @param {string} content - Text to analyze (e.g. from a social post)
 * @returns {Promise<Object>} - Analysis data ready for saving to DB
 */
async function analyzeTextContent(content) {
  const factCheckedText = await factCheck(content);
  const isBiased = await detectBias(content);
  const isPlagiarized = await checkPlagiarism(content);
  const toxicityScore = 0; // Add real scoring if needed

  return {
    inputText: content,
    toxicityScore,
    isBiased,
    isPlagiarized,
    factCheck: factCheckedText,
  };
}

module.exports = { analyzeTextContent };
