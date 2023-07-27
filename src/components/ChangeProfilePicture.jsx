import { useRef, useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../slices/authSlice"
import {apiConnector } from "../services/apiconnector"

export default function ChangeProfilePicture() {
  const { token, user } = useSelector((state) => state.auth)
  // const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [imageFile, setImageFile] = useState(null)

  const fileInputRef = useRef(null)

  const handleClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    // console.log(file)
    if (file) {
      setImageFile(file)
    }
  }

  const BASE_URL = process.env.REACT_APP_BASE_URL

  const updateDisplayPicture = (token, formData) => {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector(
          "PUT", BASE_URL + "/updateDisplayPicture",
          formData,
          {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        )
        // console.log(
        //   "update dp API RESPONSE............",
        //   response
        // )
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }

        toast.success("Display Picture Updated Successfully")

        dispatch(setUser(response.data.data))

      } catch (error) {
        console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
        toast.error("Could Not Update Display Picture")
      }
      toast.dismiss(toastId)
    }
  }

  const handleFileUpload = () => {
    try {
      // console.log("uploading...")

      const formData = new FormData()
      formData.append("displayPicture", imageFile)

      // console.log("formdata", formData)
      dispatch(updateDisplayPicture(token, formData))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between rounded-md border-[1px]
        p-8 px-12 ">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.photo}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[50px] rounded-full object-cover"
          />

          <div className="space-y-2">
            <p>Change Profile Picture</p>
            <div className="flex flex-row gap-3">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/gif, image/jpeg"
              />

              <button
                onClick={handleClick}
                className="cursor-pointer rounded-md py-2 px-5 font-semibold "
              >
                Select
              </button>

              <button
                onClick={handleFileUpload}
              >
                Upload
              </button>

            </div>

          </div>

        </div>
      </div>
    </>
  )
}