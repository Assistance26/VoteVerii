const mongoose = require('mongoose');
const { Schema } = mongoose;

const socialPostSchema = new Schema({
  candidate: { type: Schema.Types.ObjectId, ref: 'candidate', required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  postedAt: { type: Date, default: Date.now },

  analysis: { type: Schema.Types.ObjectId, ref: 'analysisResult' },
  likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
});
socialPostSchema.index({ candidate: 1 });


const SocialPost = mongoose.model('socialPost', socialPostSchema)
module.exports = SocialPost;