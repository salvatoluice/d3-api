// models/Follower.js
const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who follows the store
    store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true }, // Store being followed
});

const Follower = mongoose.model('Follower', followerSchema);

module.exports = Follower;
