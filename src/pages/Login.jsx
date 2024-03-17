import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...");

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);

      console.log("LOGIN API RESPONSE............", response);

      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success("Login Successful");
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="mt-6 flex w-full flex-col gap-y-4"
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
        Login
      </button>
    </form>
  );
}

export default Login;
