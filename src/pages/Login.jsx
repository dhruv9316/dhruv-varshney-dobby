import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import AuthForm from "../components/AuthForm";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
    <div className="m-auto">
      <AuthForm 
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formData={formData}
        btnTxt="Login"
      />
    </div>

  );
}

export default Login;
