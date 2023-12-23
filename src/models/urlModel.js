// Importing the mongoose module
const mongoose = require('mongoose');

// Defining the URL schema using mongoose
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    urlName: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Creating the URL model
const Url = mongoose.model('Url', urlSchema);

// Exporting the URL model for use in other modules
module.exports = Url;