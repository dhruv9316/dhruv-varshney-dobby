import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Form Submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");

    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData);

      console.log("SIGNUP API RESPONSE...", response);

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success("Signup Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log("SIGNUP API ERROR............", error);
      toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
  };
  return (
    <div className="mx-auto my-auto">
      <div>
        <form
          onSubmit={handleOnSubmit}
          className="flex w-full flex-col mx-auto gap-y-4"
        >
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem]">Email</p>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter your email"
              className="w-full rounded-[0.5rem] p-[12px] "
            />
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] ">Password</p>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
