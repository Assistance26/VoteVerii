const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
