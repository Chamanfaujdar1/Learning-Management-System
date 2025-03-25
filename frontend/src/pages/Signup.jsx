import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: ""
  });

  const handleUserInput = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const getImage = (e) => {
    e.preventDefault()
    const image = e.target.files[0];
    if (image) {
      setSignupData({
        ...signupData,
        avatar: image,
      });
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.addEventListener("load", function () {
      setPreviewImage(fileReader.result);
    });
  };

  async function createNewAccount(event) {
    event.preventDefault();

    if (!signupData.fullName || !signupData.email || !signupData.password || !signupData.avatar) {
      toast.error("Please fill all the fields");
      return;
    }
    if (signupData.fullName.length < 5) {
      toast.error("Name should be at least 5 characters");
      return;
    }
    if (!signupData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      toast.error("Invalid Email");
      return;
    }
    if (!signupData.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      toast.error("Password should be at least 8 characters and include at least one letter and one number");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);    
    const response = dispatch(createAccount(formData));
    if (response?.payload?.success) {
      navigate("/");  
    }

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: ""
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex justify-center items-center h-[100vh]">
        <form onSubmit={createNewAccount} noValidate className="flex flex-col justify-center rounded-lg w-96 gap-3 p-3 shadow-[0_0_10px_black]">
          <h1 className="text-center font-bold text-2xl">Registration Page</h1>
          <label htmlFor="image_uploads" className="cursor-pointer">
            {previewImage ? (
              <img className="w-24 h-24 rounded-full m-auto" src={previewImage} />
            ) : (
              <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            className="hidden"
            type="file"
            name="image_uploads"
            id="image_uploads"
            accept=".png, .jpg, .jpeg, .svg"
            onChange={getImage}
          />
          <div className="flex flex-col gap-1">
            <label htmlFor="fullName" className="font-semibold">FullName</label>
            <input
              type="text"
              required
              name="fullName"
              id="fullName"
              placeholder="Enter Your FullName..."
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="enter your email"
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={handleUserInput}
              value={signupData.email}
            />
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="enter your password"
              className="bg-transparent px-2 py-1 border rounded-lg"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>
          <button type="submit" className="mt-2 bg-blue-500 hover:bg-blue-700 hover:font-semibold text-white py-1 rounded-lg">Create Account</button>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="link text-accent">Login</Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
