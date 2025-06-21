const mongoose = require('mongoose');
const { Schema } = mongoose;

const candidateSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
  election: { type: Schema.Types.ObjectId, ref: 'Election' },

  name: { type: String, required: true },
  bio: { type: String },
  vision: { type: String },

  // content: { type: [Schema.Types.ObjectId], ref: 'CandidateContent', default: [] },
  socialPosts: { type: [Schema.Types.ObjectId], ref: 'socialPost', default: [] },
  votes: { type: [Schema.Types.ObjectId], ref: 'vote', default: [] },
}, { timestamps: true });

candidateSchema.index({ user: 1, election: 1 }, { unique: true });

const Candidate = mongoose.model('candidate',candidateSchema)
module.exports = Candidate;