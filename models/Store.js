const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    storeType: { type: String, required: true },
    location: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageUrl: { type: String },
    followers: {
        type: Number,
        default: 0 
    }
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;
