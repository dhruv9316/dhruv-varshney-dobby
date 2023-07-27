const mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required:true,
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 5*60,
    }
});

async function emailSender(email, otp) {
    try{
        const result = await sendEmail(email,
             "Verification EMAIL from Dhruv",
             `Your verification OTP is => ${otp}`);
        console.log("Email sended Successfully!! => ", result);
    } catch(error) {
        console.error(error);
        console.log("error while sending..... EMAIL", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {

	if (this.isNew) {
		await emailSender(this.email, this.otp);
	}
    
	next();
} )

module.exports = mongoose.model("OTP", otpSchema);