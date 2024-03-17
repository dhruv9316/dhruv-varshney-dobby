const User = require("../models/User");

require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  if (emailRegex.test(email)) {
    return true
  } 
  return false;
}

exports.signup = async (req, res) => {
	try {
		const {email, password}= req.body;

		if (!email || !password) {
            return res.status(403).send({
                success: false,
                message: "Both email and password are required"
            });
        }

        if (!validateEmail(email)) {
            res.status(400).json({ message: 'Invalid Email !' });
        }

		const userExisted = await User.findOne({email});
		if (userExisted) {
			return res.status(400).json({
				success: false,
				message: "You are already registered !",
			});
		}

        // console.log("hashing password sttttttttttt");
		const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hashing password endddddddddddt");

		const userDetails = await User.create({
			email,
			password: hashedPassword,
		});

		return res.status(200).json({
			success: true,
			userDetails,
			message: "User registered successfully !!",
		});

	} catch (error) {
		console.error(error);
		return res.status(500).json({
			success: false,
			message: "User cannot be registered !! ",
		});
	}
};

exports.login = async (req, res) => {
    try{
        const{email, password} = req.body;

        if( !password || !email ){
            return res.status(403).json({
                success:false,
                message:"Both email and password are required",
            });
        }

        if (!validateEmail(email)) {
            res.status(400).json({ message: 'Invalid Email !' });
        }

        const userDetails = await User.findOne({email}).select('');

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"You are not registered !",
            });
        }

        if(await bcrypt.compare(password, userDetails.password)) {
            const payload = {
                email: userDetails.email,
                id: userDetails._id,
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                // expiresIn:"365d" 
            });

            userDetails.token = token;
            userDetails.password = undefined;

            res.status(200).json({
                success:true,
                token,
                userDetails,
                message:"LOGGED IN SUCCESSFULLY !",
            });
        
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Wrong Password !",
            });
        }

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"You are not able to Login, Pls Try again !!",
        }) 
    }
} 
