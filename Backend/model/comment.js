const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'socialPost', required: true },
});
commentSchema.index({ post: 1 });

const Comment = mongoose.model('comment',commentSchema)
module.exports = Comment;