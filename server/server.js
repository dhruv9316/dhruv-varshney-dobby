const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoute");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {connectToCloudinary } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use(
	fileUpload({
		useTempFiles:true,
		tempFileDir:"/tmp",
	})
)

connectToCloudinary(); 

//mounting... routes
app.use("/api/v1", userRoutes);
// app.post("/api/v1/sendotp", sendotp)
// app.put("/api/v1/updateProfile",authentication, updateProfile)
// app.put("/api/v1/updateDisplayPicture",authentication, updateDisplayPicture)

// app.post("/api/v1/login", login)
// app.post("/api/v1/signup", signup)
 
 
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is ready to run....'
	});
});
 
app.listen(PORT, () => {
	console.log(`Your server is running at ${PORT}`)
})
 