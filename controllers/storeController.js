// controllers/storeController.js
const Store = require('../models/Store');

// Create a new store
exports.createStore = async (req, res) => {
    try {
        const { name, type, location } = req.body;

        // Create the store
        const newStore = new Store({
            name,
            type,
            location,
            owner: req.user._id  // Set the owner to the ID of the authenticated user
        });

        // Save the store to the database
        await newStore.save();

        res.status(201).json({ message: 'Store created successfully', store: newStore });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
