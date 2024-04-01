//Cooper Griffin 
//March 25 2024
//

const User = require('../models/user');

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.json({ message: 'User successfully deleted!' });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add a friend to a user's friend list and vice versa for mutual friendship

const addFriend = async (req, res) => {

    try {
  
      // Add friendId to the user's friend list
      const user = await User.findByIdAndUpdate(
  
        req.params.id,
  
        { $addToSet: { friends: req.params.friendId } },
  
        { new: true }
  
      );
      // Add userId to the friend's friend list
  
      const friend = await User.findByIdAndUpdate(
        req.params.friendId,
        { $addToSet: { friends: req.params.id } },
        { new: true }
      );
      if (!user || !friend) {
  
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'Friend added successfully' });
    } catch (error) {
      res.status(400).json(error);
    }
  };

// Remove a friend from a user's friend list and vice versa for mutual friendship
const removeFriend = async (req, res) => {
    try {
      // Remove friendId from the user's friend list
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      
      // Remove userId from the friend's friend list
      const friend = await User.findByIdAndUpdate(
        req.params.friendId,
        { $pull: { friends: req.params.id } },
        { new: true }
      );
      if (!user || !friend) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json({ message: 'Friend removed successfully' });
    } catch (error) {
      res.status(400).json(error);
    }
  };

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
};