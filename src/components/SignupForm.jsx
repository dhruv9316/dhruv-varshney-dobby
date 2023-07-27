import { useState } from "react"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import {apiConnector} from "../services/apiconnector"

import { setSignupData, setLoading } from "../slices/authSlice"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const BASE_URL = process.env.REACT_APP_BASE_URL

  const [formData, setFormData] = useState({firstName: "", lastName: "", email: "",
                           password: "", confirmPassword: "", phoneNumber:""
  })


  const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData, [e.target.name]: e.target.value,
    }))
  }

   const sendOtp = (email, navigate) => {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", BASE_URL + "/sendotp", {
          email,
          checkUserPresent: true,
        })
        console.log("send otp api RESPONSE............", response)
  
        console.log(response.data.success)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-otp")
      } catch (error) {
        console.log("send otp  api ERROR............", error)
        toast.error(error.response.data.message)
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
  }


  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
    }

    dispatch(setSignupData(signupData))

    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "", lastName: "", email: "", password: "",confirmPassword: "", 
       phoneNumber:""
    })
  }


  return (
    <div>

      <form onSubmit={handleOnSubmit} className="flex w-full flex-col mx-auto gap-y-4">

        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              First Name 
            </p>
            <input
              required
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter first name"

              className="w-full rounded-[0.5rem] p-[12px]"
            />
          </label>

          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Last Name 
            </p>
            <input
              required
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter last name"
              className="w-full rounded-[0.5rem] p-[12px]"
            />
          </label>
        </div>

        <div className="flex gap-x-4">
          <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Contact Number
            </p>
            <input
              required
              type="number"
              name="phoneNumber"
              maxLength={10}
              // minLength={10}
              value={phoneNumber}
              onChange={handleOnChange}
              placeholder="Enter your phone number"
              className="w-full rounded-[0.5rem] p-[12px]"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address 
          </p>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            className="w-full rounded-[0.5rem] p-[12px]"
          />
        </label>

        <div className="flex gap-x-4">
          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Password 
            </p>
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              className="w-full rounded-[0.5rem] p-[12px]"
            />

          </label>


          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
              Confirm Password 
            </p>
            <input
              required
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full rounded-[0.5rem] p-[12px]"
            />

          </label>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Register
        </button>
      </form>
      <Link to={"/login"}>
        <button className="mt-6 rounded-[8px] bg-slate-400 py-[8px]
         px-[12px] font-medium text-richblack-900 mx-auto" >
          already registered?  goto Login
        </button>
      </Link>

    </div>
  )
}

export default SignupForm