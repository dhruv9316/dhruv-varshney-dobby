import { useState } from "react"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"

import { apiConnector } from "../services/apiconnector"

import { setToken, setUser } from "../slices/authSlice"

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  })

  const BASE_URL = process.env.REACT_APP_BASE_URL

//   const [showPassword, setShowPassword] = useState(false)

  const { phoneNumber, password } = formData

  const login = (phoneNumber, password, navigate) => {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      try {
        const response = await apiConnector("POST", BASE_URL + "/login", {
          phoneNumber,
          password,
        })
  
        console.log("LOGIN API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Login Successful");

        dispatch(setToken(response.data.token));

        const userImage = response.data?.userDetails?.image
          ? response.data.userDetails.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userDetails.firstName} ${response.data.userDetails.lastName}`
        
        dispatch(setUser({ ...response.data.userDetails, image: userImage }))
        
        localStorage.setItem("token", JSON.stringify(response.data.token))
        localStorage.setItem("user", JSON.stringify(response.data.userDetails))
        navigate("/dashboard")
      } catch (error) {
        console.log("LOGIN API ERROR............", error)
        toast.error(error.response.data.message)
      }
      toast.dismiss(toastId)
    }
  }



  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(phoneNumber, password, navigate))
  }

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
    >
      <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem]">
          Contact Number
        </p>
        <input
          required
          type="number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={handleOnChange}
          placeholder="Enter your phone number"
          className="w-full rounded-[0.5rem] p-[12px] "
        />
      </label>
      <label className="relative">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">
          Password 
        </p>
        <input
          required
          type="password"
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          className="w-full rounded-[0.5rem] p-[12px] pr-12 "
        />

      </label>
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
      >
        Login
      </button>
    </form>
  )
}

export default Login