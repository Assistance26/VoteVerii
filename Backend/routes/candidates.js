const express = require('express');
const router = express.Router();
const Candidate = require('../model/candidate');

router.post('/', async (req, res) => {
  const candidate = await Candidate.create(req.body);
  res.status(201).json(candidate);
});

router.get('/', async (req, res) => {
  const candidates = await Candidate.find().populate('user').populate('election');
  res.json(candidates);
});

router.get('/:id', async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  res.json(candidate);
});

router.put('/:id', async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(candidate);
});

router.delete('/:id', async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
