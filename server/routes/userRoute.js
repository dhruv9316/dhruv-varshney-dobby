const express = require("express")
const router = express.Router()
const { authentication} = require("../middlewares/authentication")

const { login, signup, sendotp} = require("../controllers/Authentication")

const { updateProfile, updateDisplayPicture} = require("../controllers/UpdatedDetails")


router.put("/updateProfile", authentication, updateProfile)
router.put("/updateDisplayPicture", authentication, updateDisplayPicture)

router.post("/login", login)
router.post("/signup", signup)
router.post("/sendotp", sendotp)

module.exports = router