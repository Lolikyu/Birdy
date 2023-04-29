const mongoose = require('mongoose');

const birdSchema = mongoose.Schema(
    {
        pseudo: {type: String, required: true},
        avatar: {type: String, required: true},
        content: {type: String, required: true},
        date: {type: String, required: true},
        heure: {type: String, required: true},
        isPublic: {type: Boolean, required: true},
        dateDepuis70: {type: Number, required: true},
        commentaires: {type: Array, default: []},
        likes: {type: Array, default: []},
        rebirds: {type: Array, default: []},
        favorites: {type: Array, default: []},
    }
);

module.exports = mongoose.model('Bird', birdSchema);