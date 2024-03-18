// controllers/followerController.js
const Follower = require('../models/Follower');

// Follow a store
exports.followStore = async (req, res) => {
    try {
        const { userId, storeId } = req.body;

        // Check if the user is already following the store
        const existingFollower = await Follower.findOne({ user: userId, store: storeId });
        if (existingFollower) {
            return res.status(400).json({ message: 'User is already following the store' });
        }

        // Create a new follower entry
        const newFollower = new Follower({ user: userId, store: storeId });
        await newFollower.save();

        res.status(201).json({ message: 'User followed the store successfully', follower: newFollower });
    } catch (error) {
        console.error('Error following store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Unfollow a store
exports.unfollowStore = async (req, res) => {
    try {
        const { userId, storeId } = req.body;

        // Check if the user is following the store
        const existingFollower = await Follower.findOne({ user: userId, store: storeId });
        if (!existingFollower) {
            return res.status(400).json({ message: 'User is not following the store' });
        }

        // Remove the follower entry
        await existingFollower.remove();

        res.status(200).json({ message: 'User unfollowed the store successfully' });
    } catch (error) {
        console.error('Error unfollowing store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all shop followers
exports.getStoreFollowers = async (req, res) => {
    try {
        const { storeId } = req.params;

        // Find all followers of the store
        const followers = await Follower.find({ store: storeId }).populate('user', 'first_name last_name');

        res.status(200).json({ followers });
    } catch (error) {
        console.error('Error retrieving shop followers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
