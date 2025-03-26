import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom"; // Added Link import

import HomeLayout from "../Layout/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  async function onLogin(event) {
    event.preventDefault();

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill all the fields");
      return;
    }

    const response = await dispatch(login(loginData));

    if (response?.payload?.success) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(response.payload.message || "Login failed");
    }

    // Reset login data after the attempt
    setLoginData({
      email: "",
      password: "",
    });
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form
          onSubmit={onLogin}
          noValidate
          className="flex flex-col justify-center rounded-lg w-96 gap-3 p-3 shadow-[0_0_10px_black]"
        >
          <h1 className="text-center font-bold text-2xl">Login Page</h1>
          
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="enter your email"
            className="bg-transparent px-2 py-1 border rounded-lg"
            onChange={handleUserInput}
            value={loginData.email} // Changed from signupData to loginData
          />
          
          <label htmlFor="password" className="font-semibold">
            Password
          </label>
          <input
            type="password"
            required
            name="password"
            id="password"
            placeholder="enter your password"
            className="bg-transparent px-2 py-1 border rounded-lg"
            onChange={handleUserInput}
            value={loginData.password} // Changed from signupData to loginData
          />
          
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-700 hover:font-semibold text-white py-1 rounded-lg"
          >
            Login
          </button>
          
          <p className="text-center text-blue-500 hover:text-blue-700 cursor-pointer">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p className="text-center">
            Don`t have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Login;
