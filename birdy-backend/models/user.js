const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema(
    {
        pseudo: {type:String, required:true, unique:true},
        nom: {type:String, required:true},
        prenom: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        password: {type:String, required:true},
        dateNaissance: {type:String, required:true},
        avatar: {type:String, required:true},
        birds: {type:Array, default:[]},
        follows: {type:Array, default:[]},
        followers: {type:Array, default:[]},
        likes: {type:Array, default:[]},
        rebirds: {type:Array, default:[]},
        favorites: {type:Array, default:[]},
    }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);