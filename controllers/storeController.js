const Store = require('../models/Store');

// Create a new store
exports.createStore = async (req, res) => {
    try {
        const { name, storeType, location } = req.body;

        // Create the store
        const newStore = new Store({
            name,
            storeType,
            location,
            owner: req.user._id, // Set the owner to the ID of the authenticated user
            imageUrl: req.body.imageUrl // Adding imageUrl field from the request body
        });

        // Save the store to the database
        await newStore.save();

        res.status(201).json({ message: 'Store created successfully', store: newStore });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all stores
exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json({ stores });
    } catch (error) {
        console.error('Error retrieving stores:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single store by ID
exports.getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ store });
    } catch (error) {
        console.error('Error retrieving store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a store by ID
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

// Delete a store by ID
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
