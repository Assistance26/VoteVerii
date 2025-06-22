
// GET /api/analysis/:id
const SocialPost = require('../model/socialPost');
const AnalysisResult = require('../model/analysisResult');

exports.getAnalysisById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Fetching SocialPost for ID: ${id}`);

    // Step 1: Fetch the SocialPost first
    const socialPost = await SocialPost.findById(id);
    if (!socialPost) {
      return res.status(404).json({ success: false, message: 'SocialPost not found' });
    }

    console.log("✅ Found SocialPost:", socialPost);

    // Step 2: Now use the analysis field to fetch AnalysisResult
    const analysis = await AnalysisResult.findById(socialPost.analysis);
    if (!analysis) {
      return res.status(404).json({ success: false, message: 'AnalysisResult not found' });
    }

    console.log("✅ Found AnalysisResult:", analysis);

    res.status(200).json({
      success: true,
      data: {
        id: analysis._id,
        inputText: analysis.inputText,
        toxicityScore: analysis.toxicityScore,
        isBiased: analysis.isBiased,
        isPlagiarized: analysis.isPlagiarized,
        factCheck: analysis.factCheck,
        createdAt: analysis.createdAt,
        socialPost: {
          id: socialPost._id,
          content: socialPost.content,
          candidate: socialPost.candidate,
          postedAt: socialPost.postedAt,
          imageUrl: socialPost.imageUrl,
        }
      }
    });

  } catch (error) {
    console.error('❌ Error fetching analysis by post ID:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
