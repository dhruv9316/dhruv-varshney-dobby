const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    token :{
        type:String,
    },
    uploaded_images: [
        {
            type: Object,
        }
    ]
});

module.exports = mongoose.model("User", userDetailsSchema);