const mongoose = require('mongoose');
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    urlName:{
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
const Url = mongoose.model('Url', urlSchema);
module.exports = Url;