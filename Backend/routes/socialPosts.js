// routes/socialPost.routes.js
const express = require('express');
const router = express.Router();
const socialPostController = require('../controllers/socialPost');
const upload = require('../middleware/upload');
// Routes
// router.post('/', socialPostController.createPost);
router.post('/', upload.single('image'), socialPostController.createPost);
router.get('/all', socialPostController.getAllPosts);
router.put('/:id', socialPostController.updatePost);
router.delete('/:id', socialPostController.deletePost);
module.exports = router;








// const express = require('express');
// const router = express.Router();
// const socialPostController = require('../controllers/socialPost');
// const verifyFirebaseToken = require('../middleware/auth'); // 👈 Import it

// router.post('/', verifyFirebaseToken, socialPostController.createPost); // 👈 Use here
// router.get('/all', socialPostController.getAllPosts);
// router.put('/:id', socialPostController.updatePost);
// router.delete('/:id', socialPostController.deletePost);

// module.exports = router;




