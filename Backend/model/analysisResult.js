const mongoose = require('mongoose');
const { Schema } = mongoose;

const analysisResultSchema = new Schema({
  // _id: { type: String, default: () => crypto.randomUUID() },
  inputText: { type: String, required: true },
  toxicityScore: { type: Number, required: true },
  isBiased: { type: Boolean, required: true },
  isPlagiarized: { type: Boolean, required: true },
  factCheck: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  socialPost: { type: Schema.Types.ObjectId, ref: 'socialPost', unique: true },
});

const AnalysisResult = mongoose.model('analysisResult',analysisResultSchema)
module.exports = AnalysisResult;