const User = require("../models/User")
const { uploadPhoto } = require("../utils/photoUploader")

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id

    const photo = await uploadPhoto(
      displayPicture, process.env.FOLDER_NAME, 1000, 1000
    )
    console.log(photo)

    const updatedPicture = await User.findByIdAndUpdate(
                                    { _id: userId },
                                    { photo: photo.secure_url },
                                    { new: true }
                                  )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedPicture,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { firstName = "",lastName = "", pastExperience = "", educationalQualification = "",
      email = "", skillSet = "" } = req.body

    const id = req.user.id

    // Find the profile by id

    // const updatedUserDetails = await User.findByIdAndUpdate(id, {
    //   firstName, lastName, pastExperience, educationalQualification, email, skillSet })
    // await updatedUserDetails.save()

    const updatedUserDetails = await User.findByIdAndUpdate(
      id,
      {
        firstName:firstName,
        lastName:lastName,
        educationalQualification:educationalQualification,
        // .toString(),
        email:email,
        skillSet:skillSet,
        pastExperience:pastExperience
      },
      // {
      //   lastName:lastName
      // },
      // {
      //   pastExperience:pastExperience
      // },
      // {
      //   educationalQualification:educationalQualification
      // },
      // {
      //   email:email
      // },
      // {
      //   skillSet:skillSet
      // },
      {
        new:true
      }
    )


    return res.json({
      success: true,
      message: "Profile updated successfully !!",
      updatedUserDetails,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}


