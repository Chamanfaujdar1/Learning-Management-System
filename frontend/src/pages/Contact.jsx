import React, { useState } from 'react'
import { toast } from 'react-hot-toast'

import axiosInstance from '../Helpers/axiosInstance'
import { isEmail } from '../Helpers/regexMatcher'
import HomeLayout from '../Layout/HomeLayout'

export default function Contact() {
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  };

  async function formSubmit(e) {
    e.preventDefault();
    if (!userInput.name || !userInput.email || !userInput.message) {
      toast.error('Please fill out all fields');
      return;
    }

    if (!isEmail(userInput.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    try {
      const response = axiosInstance.post('/contact', userInput);

      toast.promise(response, {
        loading: "Submitting Your Message...",
        success: "Form submitted successfully...",
        error: "Failed to submit form data"
      });

      const contactResponse = await response;
      if (contactResponse?.data?.success) {
        setUserInput({
          name: "",
          email: "",
          message: ""
        });
      }
    } catch (error) {
      toast.error("Form submission failed");
    }
  }

  return (
    <HomeLayout>
      <div className='flex flex-col justify-center items-center h-screen'>
        <form className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black]' noValidate onSubmit={formSubmit}>
          <h1 className='text-3xl font-bold'>Contact Us</h1>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="name" className="text-xl font-semibold">Name</label>
            <input 
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={handleChange}
              value={userInput.name}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="email" className="text-xl font-semibold">Email</label>
            <input 
              className="bg-transparent border px-2 py-1 rounded-sm"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              value={userInput.email}
            />
          </div>
          <div className="flex flex-col w-full gap-1">
            <label htmlFor="message" className="text-xl font-semibold">Message</label>
            <textarea
              className="bg-transparent border-b-2 border-white outline-none resize-none w-80"
              id="message"
              name="message"
              rows="5"
              placeholder='Enter your message'
              onChange={handleChange}
              value={userInput.message}
            />
          </div>
          <button type='submit' className='bg-blue-500 px-5 py-2 rounded-md w-full hover:bg-blue-700 duration-300 transition-all ease-in-out'>Submit</button>
        </form>
      </div>
    </HomeLayout>
  )
}
