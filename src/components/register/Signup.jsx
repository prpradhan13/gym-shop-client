import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import BtnLoading from "../loading/BtnLoading";

function Signup({ setIsSignupActive, setIsLoginActive }) {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    answer: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  console.log("Render");
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/register`, formData)
      
      if (data.success) {
        setIsSignupActive(false);
        setIsLoginActive(true);
      } else {
        toast.error(data.error.message);
      } 

    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while logging in');
      }
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="w-full mt-[2rem] px-10">
      <form className="flex flex-col items-center gap-8" onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="fullname" className="font-semibold text-sm">
              Full Name:
            </label>
            <input
              type="text"
              id="fullname"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold text-sm">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter full name"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-sm">
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="font-semibold text-sm">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="answer" className="font-semibold text-sm">
              Answer:
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter your favriote game?"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className={`${isLoading ? 'bg-[#000000ea] cursor-not-allowed' : 'bg-black'} text-white font-semibold w-full h-[48px] py-3 rounded-3xl uppercase flex justify-center items-center`}
          disabled={isLoading}
        >
          {isLoading ? <BtnLoading /> : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default Signup;
