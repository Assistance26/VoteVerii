const mongoose = require('mongoose');
const { Schema } = mongoose;

// const Roles = ['ADMIN', 'VOTER', 'CANDIDATE'];

const userSchema = new Schema({
  firebaseUid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  role: {
    type: String,
    enum: ['ADMIN', 'VOTER', 'CANDIDATE'],
    default: 'VOTER',
    set: v => v.toUpperCase()
  },
  candidate: { type: Schema.Types.ObjectId, ref: 'candidate' },
  comments: { type: [Schema.Types.ObjectId], ref: 'Comment', default: [] },
  likedPosts: { type: [Schema.Types.ObjectId], ref: 'SocialPost', default: [] },
}, { timestamps: true });

userSchema.index({ email: 1 });
userSchema.index({ firebaseUid: 1 });
const User = mongoose.model('user',userSchema)
module.exports = User;