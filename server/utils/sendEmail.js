const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, title, body) => {
    try{
        let transporter = nodemailer.createTransport({
            host : process.env.MAIL_HOST,
            auth:{
                pass : process.env.MAIL_PASS,
                user : process.env.MAIL_USER,
            }

        })

        let info = await transporter.sendMail({
            from: 'from DHRUV VARSHNEY',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        
        return info;

    } catch(error) {
        console.error(error);
        console.log(error.message);
    }
}

module.exports = sendEmail;