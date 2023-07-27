const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    photo:{
        type:String,
        required:true
    },
    token :{
        type:String,
    },
    pastExperience : {
        type:String,
    },
    skillSet : {
        type :String,
    },
    educationalQualification : {
        type:String,
    }
},
);

module.exports = mongoose.model("User", userDetailsSchema);