// const SocialPost = require('../model/socialPost');
// const AnalysisResult = require('../model/analysisResult');
// const mongoose = require('mongoose');
// const { analyzeTextContent } = require('../services/analyzeTextService'); // 👈 import the new service
// const Comment = require('../model/comment');
// const User = require('../model/user');

// exports.createPost = async (req, res) => {
//   console.log("Received create post request:", req.body);
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { title, description, tags, images, email } = req.body;
//     const content = `${title}\n\n${description}`;

//     // 1. Call the extracted analysis service
//     console.log("Calling analysis service...");
//     const analysisData = await analyzeTextContent(content);
//     console.log("Result from analysis service:", analysisData);

//     // 2. Save analysis
//     console.log("Saving analysis...");
//     const analysis = new AnalysisResult(analysisData);
//     await analysis.save({ session });
//     console.log("Analysis saved:", analysis);

//     // 3. Create the post linked to the analysis

//     console.log("Creating post...");
//     const user = await User.findOne({ email });
//     if (!user) {
//   console.error("User not found for email:", email);
//   return res.status(404).json({ error: "User not found" });
// }

// if (user.role === 'CANDIDATE') {
//   console.log("User is a candidate, proceeding with post creation...");
//   const post = new SocialPost({
//     candidate: user._id,
//     content,
//     imageUrl: images?.[0],
//     postedAt: new Date(),
//     analysis: analysis._id
//   });
//   console.log("Post:", post);

//   await post.save({ session });
// }
//     // 4. Link post ID back into analysis (optional)
//     console.log("Linking post back to analysis...");
//     analysis.socialPost = post._id;
//     await analysis.save({ session });
//     console.log("Analysis updated:", analysis);

//     // 5. Commit
//     console.log("Committing transaction...");
//     await session.commitTransaction();
//     console.log("Transaction committed");
//     session.endSession();

//     res.status(201).json({ success: true, data: post });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.error("Post creation failed:", error);
//     await session.abortTransaction();
//     session.endSession();
//     res.status(400).json({ success: false, message: error.message });
//   }
// };


// exports.updatePost = async (req, res) => {
//   try {
//     const { title, description, images } = req.body;
//     const content = `${title}\n\n${description}`;

//     const updated = await SocialPost.findByIdAndUpdate(
//       req.params.id,
//       {
//         content,
//         imageUrl: images?.[0]
//       },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ success: false, message: 'Post not found' });
//     }

//     res.status(200).json({ success: true, data: updated });
//   } catch (error) {
//     console.error('Post update failed:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// exports.deletePost = async (req, res) => {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const post = await SocialPost.findById(req.params.id).session(session);
//     if (!post) {
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(404).json({ success: false, message: 'Post not found' });
//     }

//     // Delete related comments
//     if (post.comments.length > 0) {
//       await Comment.deleteMany({ _id: { $in: post.comments } }).session(session);
//     }

//     // Optionally delete analysis
//     if (post.analysis) {
//       await AnalysisResult.findByIdAndDelete(post.analysis).session(session);
//     }

//     await post.deleteOne({ session });

//     await session.commitTransaction();
//     session.endSession();
//     res.status(200).json({ success: true, message: 'Post deleted successfully' });
//   } catch (error) {
//     await session.abortTransaction();
//     session.endSession();
//     console.error('Post deletion failed:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await SocialPost.find()
//       .populate('candidate')
//       .populate('analysis')
//       .populate('likedBy')
//       .populate('comments')
//       .sort({ postedAt: -1 });

//     const transformed = posts.map(post => {
//       const [title, ...descParts] = post.content.split('\n\n');
//       return {
//         id: post._id,
//         title,
//         description: descParts.join('\n\n'),
//         images: post.imageUrl ? [post.imageUrl] : [],
//         candidate: post.candidate,
//         analysis: post.analysis,
//         likes: post.likedBy?.length || 0,
//         comments: post.comments || [],
//         postedAt: post.postedAt
//       };
//     });

//     res.status(200).json({ success: true, data: transformed });
//   } catch (error) {
//     console.error('Fetching posts failed:', error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };






// exports.createPost = async (req, res) => {
//   console.log("Received create post request:", req.body);
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   try {
//     const { title, description, tags, images, email } = req.body;
//     const content = `${title}\n\n${description}`;

//     // 1. Analyze content
//     console.log("Calling analysis service...");
//     const analysisData = await analyzeTextContent(content);
//     console.log("Result from analysis service:", analysisData);

//     // 2. Save analysis
//     console.log("Saving analysis...");
//     const analysis = new AnalysisResult(analysisData);
//     await analysis.save({ session });
//     console.log("Analysis saved:", analysis);

//     // 3. Find user
//     console.log("Creating post...");
//     const user = await User.findOne({ email });
//     if (!user) {
//       console.error("User not found for email:", email);
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 4. Check if user is a candidate
//     let post;
//     if (user.role === 'CANDIDATE') {
//       console.log("User is a candidate, proceeding with post creation...");
//       post = new SocialPost({
//         candidate: user._id,
//         content,
//         imageUrl: images?.[0], // ⚠️ Make sure blob URLs aren't used long-term
//         postedAt: new Date(),
//         analysis: analysis._id
//       });

//       console.log("Post:", post);
//       await post.save({ session });
//     } else {
//       console.log("User is not a candidate.");
//       await session.abortTransaction();
//       session.endSession();
//       return res.status(403).json({ error: "Only candidates can create posts." });
//     }

//     // 5. Link post to analysis
//     console.log("Linking post back to analysis...");
//     analysis.socialPost = post._id;
//     await analysis.save({ session });
//     console.log("Analysis updated:", analysis);

//     // 6. Commit transaction
//     console.log("Committing transaction...");
//     await session.commitTransaction();
//     session.endSession();
//     console.log("Transaction committed");

//     res.status(201).json({ success: true, data: post });
//   } catch (error) {
//     if (session.inTransaction()) await session.abortTransaction();
//     session.endSession();
//     console.error("Post creation failed:", error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
const SocialPost = require('../model/socialPost');
const AnalysisResult = require('../model/analysisResult');
const mongoose = require('mongoose');
const { analyzeTextContent } = require('../services/analyzeTextService');
const Comment = require('../model/comment');
const User = require('../model/user');

exports.createPost = async (req, res) => {
  console.log("Received create post request:", req.body);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, description, tags, email } = req.body;
    const content = `${title}\n\n${description}`;

    // 1. Analyze content
    console.log("Calling analysis service...");
    const analysisData = await analyzeTextContent(content);
    console.log("Result from analysis service:", analysisData);

    // 2. Save analysis
    console.log("Saving analysis...");
    const analysis = new AnalysisResult(analysisData);
    await analysis.save({ session });
    console.log("Analysis saved:", analysis);

    // 3. Find user
    console.log("Creating post...");
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found for email:", email);
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ error: "User not found" });
    }

    // 4. Validate candidate
    if (user.role !== 'CANDIDATE') {
      console.log("User is not a candidate.");
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({ error: "Only candidates can create posts." });
    }

    // 5. Handle image upload (Multer stores it in req.file)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    console.log("Image URL:", imageUrl);
    
    // 6. Create and save the post
    const post = new SocialPost({
      candidate: user._id,
      content,
      imageUrl,
      postedAt: new Date(),
      analysis: analysis._id
    });

    await post.save({ session });

    // 7. Link post to analysis
    analysis.socialPost = post._id;
    await analysis.save({ session });

    // 8. Commit transaction
    await session.commitTransaction();
    session.endSession();
    console.log("Transaction committed");
    
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();
    console.error("Post creation failed:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};



exports.updatePost = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const content = `${title}\n\n${description}`;

    const updated = await SocialPost.findByIdAndUpdate(
      req.params.id,
      {
        content,
        imageUrl: images?.[0]
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Post update failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const post = await SocialPost.findById(req.params.id).session(session);
    if (!post) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    // Delete related comments
    if (post.comments.length > 0) {
      await Comment.deleteMany({ _id: { $in: post.comments } }).session(session);
    }

    // Delete related analysis
    if (post.analysis) {
      await AnalysisResult.findByIdAndDelete(post.analysis).session(session);
    }

    await post.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    if (session.inTransaction()) await session.abortTransaction();
    session.endSession();
    console.error('Post deletion failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await SocialPost.find()
      .populate('candidate')
      .populate('analysis')
      .populate('likedBy')
      .populate('comments')
      .sort({ postedAt: -1 });

    const transformed = posts.map(post => {
      const [title, ...descParts] = post.content.split('\n\n');
      return {
        id: post._id,
        title,
        description: descParts.join('\n\n'),
        images: post.imageUrl ? [post.imageUrl] : [],
        candidate: post.candidate,
        analysis: post.analysis,
        likes: post.likedBy?.length || 0,
        comments: post.comments || [],
        postedAt: post.postedAt
      };
    });

    res.status(200).json({ success: true, data: transformed });
  } catch (error) {
    console.error('Fetching posts failed:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
