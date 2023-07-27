import { useState } from "react";
import { toast } from "react-hot-toast"

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiConnector } from "../services/apiconnector";

import OtpInput from "react-otp-input";

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL

  
  const signUp = ( firstName, lastName, email, password, confirmPassword, phoneNumber, 
    otp, navigate ) => {
    return async (dispatch) => {

    const toastId = toast.loading("Loading...")

    try {
        const response = await apiConnector("POST", BASE_URL + "/signup", {
        firstName, lastName, email, password, confirmPassword, phoneNumber, 
        otp
        })

        console.log("SIGNUP API RESPONSE............", response)

        if (!response.data.success) {
        throw new Error(response.data.message)
        }

        toast.success("Signup Successful")

        navigate("/login")
    } catch (error) {
        console.log("SIGNUP API ERROR............", error)
        toast.error(error.response.data.message)
        }
    toast.dismiss(toastId)
    }
    }

  const handleVerification = (e) => {
    e.preventDefault();
    const {firstName, lastName, email, password, confirmPassword, phoneNumber } = signupData;


    dispatch(
      signUp( firstName, lastName, email, password, confirmPassword, phoneNumber, otp,
        navigate )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="mx-auto text-3xl font-extrabold text-white"> 
          Loading....
        </div>
      ) : (
            <div>
                <form onSubmit={handleVerification}>
                    {/* <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Enter the OTP
                        </p>
                        <input
                            required
                            type="number"
                            name="otp"
                            // value={otp}
                            onChange={handleOTPChange}
                            placeholder="Enter your otp here"
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] 
                            text-richblack-5"
                        />
                    </label> */}
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderInput={(props) => 
                            <input
                            {...props}
                            placeholder="-"
                            className="w-[60px] border-0
                             bg-black rounded-[0.5rem] text-white
                              aspect-square text-center focus:border-0 focus:outline-2
                            focus:outline-[#ffa500]"
                    />
                        }
                        containerStyle={{
                            justifyContent: "space-between",
                            gap: "0 6px",
                        }}
                    />
                    <button
                        type="submit"
                        className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium"
                    >
                        Verify OTP
                    </button>
                </form>

            </div>

      )
      }
    </div>
  );
}

export default VerifyEmail;