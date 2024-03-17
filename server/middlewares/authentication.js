const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.authentication = async(req, res, next) => {
    try{
        const token = req.body.token || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success:false,
                message:'token is missing',
            });
        }

        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;

        } catch (error) {
            return res.status(401).json({
                success:false,
                message:'Invalid TOKEN..',
            });
        }
        next();

    } catch(error) {
        return res.status(401).json({
            success:false,
            message:'There is an issue regarding TOKEN..',
        });
    }
}
