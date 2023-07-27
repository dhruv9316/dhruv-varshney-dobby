const User = require("../models/User");
const OTP = require("../models/OTP");

require("dotenv").config();

const otpGenerator = require("otp-generator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.sendotp = async (req, res) => {
    try{
        const {email, phoneNumber} = req.body;

        const isUserAlreadyPresent = await User.findOne({phoneNumber});

        console.log("----isUserAlreadyPresen----", isUserAlreadyPresent);

		if (isUserAlreadyPresent) {
			return res.status(400).json({
				success: false,
				message: "You are already registered !!",
			});
		}

        var otp = otpGenerator.generate(6, {
            specialChars:false,
            lowerCaseAlphabets:false,
            upperCaseAlphabets:false,
        });
        console.log("Generated otp is  => ",otp);

        const result = await OTP.findOne({ otp: otp });

		console.log("---------Result is Generated------");
		console.log("--Result--", result);
		while (result) {
			otp = otpGenerator.generate(6, {
                specialChars:false,
                lowerCaseAlphabets:false,
				upperCaseAlphabets: false,
			});
		}

        const otpPayload = {email, otp};
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBODY -> ", otpBody);

        res.status(200).json({
            success:true,
            message:"OTP Sended SUCCESSFULLY !!",
        })

    } catch(error){
        console.log(error.message);
        return  res.status(500).json({
            success:false,
            message:error.message,
        })
    }
 
}


exports.signup = async (req, res) => {
	try {
		const { firstName, lastName, phoneNumber, email, password, confirmPassword, otp }
                 = req.body;

		if (!firstName || !lastName || !phoneNumber || !email || !password || !confirmPassword
             || !otp ) {
                return res.status(403).send({
                    success: false,
                    message: "Please provide all required details",
                });
		    }

		if (password !== confirmPassword) {
			return res.status(400).json({
				success: false,
				message:
					"Password and Confirm Password do not matched !!",
			});
		}

		const userExisted = await User.findOne({phoneNumber});
		if (userExisted) {
			return res.status(400).json({
				success: false,
				message: "You are already registered !!",
			});
		}

		const response = await OTP.find({email})
                                    .sort({createdAt: -1 })
                                    .limit(1);
		console.log(response);
        
		if (response.length === 0) {
			return res.status(400).json({
				success: false,
				message: "OTP Not Founded !!",
			});
		}
        else if (otp !== response[0].otp) {
			return res.status(400).json({
				success: false,
				message: "The OTP you entered is wrong !!",
			});
		}

        // console.log("hashing password sttttttttttt");
		const hashedPassword = await bcrypt.hash(password, 10);
        // console.log("hashing password endddddddddddt");

		const userDetails = await User.create({
			firstName,
			lastName,
			email,
			phoneNumber,
			password: hashedPassword,
			photo: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
			pastExperience: null,
			skillSet: null,
			educationalQualification: null,
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
        const{
            phoneNumber,
            password,
        } = req.body;

        if( !password || !phoneNumber ){
            return res.status(403).json({
                success:false,
                message:"Please provide all required details",
            });
        }

        const userDetails = await User.findOne({phoneNumber});

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"You are not registered !!",
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

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                userDetails,
                message:"LOGGED IN SUCCESSFULLY !!",
            });
        
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password do not matched !!",
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
