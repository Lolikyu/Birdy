const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const birdSchema = mongoose.Schema({
    pseudo:{type:String, required:true},
    avatar:{type:String, required:true},
    content:{type:String, required:true},
    date:{type:String, required:true},
    heure:{type:String, required:true},
    isPrivate:{type:Boolean, required:true},
    dateDepuis70:{type:Number, required:true},
    commentaires:{type:Array, default:[]}
});

module.exports = mongoose.model('Bird', birdSchema);