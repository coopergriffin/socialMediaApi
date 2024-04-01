//Cooper Griffin 
//March 25th 2024
//Controller file for thought model

const Thought = require('../models/thought');
const User = require('../models/user');

// Create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find({});
    res.json(thoughts);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a single thought by ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a thought by ID
const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a thought by ID
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    await User.findByIdAndUpdate(
      thought.userId,
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );
    res.json({ message: 'Thought successfully deleted!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add a reaction to a thought
const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Remove a reaction from a thought
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }
    res.json(thought);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
};