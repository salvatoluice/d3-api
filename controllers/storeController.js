const Store = require('../models/Store');
const Follower = require('../models/Follower');

exports.createStore = async (req, res) => {
    try {
        const { name, storeType, location } = req.body;

        const newStore = new Store({
            name,
            storeType,
            location,
            owner: req.user._id, 
            imageUrl: req.body.imageUrl 
        });
        await newStore.save();

        res.status(201).json({ message: 'Store created successfully', store: newStore });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getStoreById = async (req, res) => {
    try {
        const storeId = req.params.storeId;

        const store = await Store.findById(storeId).populate('owner', 'first_name last_name email phone');

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const followersCount = await Follower.countDocuments({ store: storeId });
        store.followers = followersCount;

        res.status(200).json({ store });
    } catch (error) {
        console.error('Error retrieving store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find().populate('owner', 'first_name last_name email phone');

        if (!stores) {
            return res.status(404).json({ message: 'Stores not found' });
        }

        for (let store of stores) {
            const followersCount = await Follower.countDocuments({ store: store._id });
            store.followers = followersCount;
        }

        const reversedStores = stores.reverse();

        res.status(200).json({ stores: reversedStores });
    } catch (error) {
        console.error('Error retrieving stores:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.updateStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        const { name, storeType, location, imageUrl } = req.body;

        const updatedStore = await Store.findByIdAndUpdate(storeId, { name, storeType, location, imageUrl }, { new: true });
        if (!updatedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ message: 'Store updated successfully', store: updatedStore });
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getUserStores = async (req, res) => {
    try {
        const userId = req.params.userId;
        const stores = await Store.find({ owner: userId });
        res.status(200).json({ stores });
    } catch (error) {
        console.error('Error retrieving user stores:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteStore = async (req, res) => {
    try {
        const { storeId } = req.params;

        const deletedStore = await Store.findByIdAndDelete(storeId);
        if (!deletedStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
        console.error('Error deleting store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
