const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName:{
        required:true,
        type:String,
        max:30,
        min:3,
        unique:true
    },
    userEmail:{
        required:true,
        type:String,
        max:50,
        unique:true
    },
    userPassword:{
        required:true,
        type:String,
        max:30,
        min:8
    },
    isAvatar:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("Users",userSchema);