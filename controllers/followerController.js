const Follower = require('../models/Follower');

exports.followStore = async (req, res) => {
    try {
        const { userId, storeId } = req.body;

        const existingFollower = await Follower.findOne({ user: userId, store: storeId });
        if (existingFollower) {
            return res.status(400).json({ message: 'User is already following the store' });
        }

        const newFollower = new Follower({ user: userId, store: storeId });
        await newFollower.save();

        res.status(201).json({ message: 'User followed the store successfully', follower: newFollower });
    } catch (error) {
        console.error('Error following store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.unfollowStore = async (req, res) => {
    try {
        const { userId, storeId } = req.body;

        const existingFollower = await Follower.findOne({ user: userId, store: storeId });
        if (!existingFollower) {
            return res.status(400).json({ message: 'User is not following the store' });
        }

        await existingFollower.remove();

        res.status(200).json({ message: 'User unfollowed the store successfully' });
    } catch (error) {
        console.error('Error unfollowing store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getStoreFollowers = async (req, res) => {
    try {
        const { storeId } = req.params;

        const followers = await Follower.find({ store: storeId }).populate('user', 'first_name last_name');

        res.status(200).json({ followers });
    } catch (error) {
        console.error('Error retrieving shop followers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
