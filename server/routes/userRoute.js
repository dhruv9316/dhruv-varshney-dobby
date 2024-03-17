const express = require("express")
const router = express.Router()
const { authentication} = require("../middlewares/authentication")

const { login, signup} = require("../controllers/Authentication")

const { uploadImage, fetchAllImages} = require("../controllers/UserController")


router.post("/upload-image", authentication, uploadImage)
router.get("/fetch-all-images", authentication, fetchAllImages)

router.post("/login", login)
router.post("/signup", signup)

module.exports = router