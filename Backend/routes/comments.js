const express = require('express');
const router = express.Router();
const Comment = require('../model/comment');

router.post('/', async (req, res) => {
  const comment = await Comment.create(req.body);
  res.status(201).json(comment);
});

router.get('/post/:postId', async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).populate('user');
  res.json(comments);
});

module.exports = router;
