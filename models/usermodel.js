const mongoose = require('mongoose');

const usershcema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    }
})

const user = mongoose.model('user',usershcema);
module.exports = user;