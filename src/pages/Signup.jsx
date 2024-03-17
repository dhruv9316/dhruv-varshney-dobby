import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthForm from "../components/AuthForm";

function Signup() {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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

      <AuthForm 
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        btnTxt="Register"
      />

    </div>
  );
}

export default Signup;
