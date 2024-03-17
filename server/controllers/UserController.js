const User = require("../models/User")
const { uploadPhoto } = require("../utils/photoUploader")

exports.uploadImage = async (req, res) => {
  try {
    const image = req.files.image
    const userId = req.user.id
    const {img_name} = req.body

    const photo = await uploadPhoto(
      image, process.env.FOLDER_NAME, 1000, 1000
    )
    console.log(photo)

    const inputObj = {
      img: photo.secure_url,
      img_name
    }

    const response = await User.findByIdAndUpdate(
      { _id: userId },
      { 
        $push: {
          uploaded_images: inputObj
        }
      },
      { new: true }
    )

    res.status(200).send({
      success: true,
      message: `Image Uploaded successfully`,
      data: response,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.fetchAllImages = async (req, res) => {
  try {

    const id = req.user.id

    const result = await User.findById(
      id,
      {
        uploaded_images:1,
      }
    )

    return res.json({
      success: true,
      data: result,
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server error",
    })
  }
}


