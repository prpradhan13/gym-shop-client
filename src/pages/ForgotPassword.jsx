import { useState } from 'react';
import logo from '../assets/gs-icon-black.svg'
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import BtnLoading from '../components/loading/BtnLoading';
import toast from 'react-hot-toast';
import axios from 'axios';

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    email: '',
    answer: '',
    newPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormDetails((prevData) => ({
        ...prevData,
        [name]: value
    }))
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/forgotpassword`, formDetails)
        
        if (data.success) {
            navigate('/register')
            toast.success(data.message);
        } else {
            toast.error(data.error.message);
        } 
        
    } catch (error) {
        console.log(error);
        if (error.response.data.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error('An error occurred while restting password');
        }
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-screen lg:flex lg:items-center lg:justify-center p-5 font-Monts">
        <div className="w-full lg:w-[40vw] ">
            <div className="flex flex-col items-center gap-6">
                <figure className="">
                    <img src={logo} className='h-[6vh] md:h-[4vh] lg:h-[6vh]' alt="Logo"/>
                </figure>
                <h1 className='uppercase font-bold text-base'> Forgot Password </h1>
            </div>
            <div className="w-full mt-4 px-10 flex flex-col items-center">
                <form className="w-full" onSubmit={handleForgotPasswordSubmit}>
                    <div className="w-full">
                        <div className="flex flex-col">
                            <label htmlFor="email" className="font-semibold text-sm"> Email Address: </label>
                            <input 
                                type="email" 
                                id='email' 
                                name='email'
                                value={formDetails.email}
                                onChange={handleChange}
                                className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm" 
                                placeholder="Enter email address" 
                                required
                            />
                        </div>

                        <div className="flex flex-col mt-[1rem]">
                            <label htmlFor="answer" className="font-semibold text-sm"> Answer: </label>
                            <input 
                                type="text" 
                                id='answer' 
                                name='answer'
                                value={formDetails.answer}
                                onChange={handleChange}
                                className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm" 
                                placeholder="Enter your favriote game?" 
                                required
                            />
                        </div>

                        <div className="flex flex-col mt-[1rem]">
                            <label htmlFor="password" className="font-semibold text-sm"> New Password: </label>
                            <input 
                                type="password" 
                                id='newPassword' 
                                name='newPassword'
                                value={formDetails.newPassword}
                                onChange={handleChange} 
                                className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm" 
                                placeholder="Enter new password" 
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className={`${isLoading ? 'bg-[#000000ea] cursor-not-allowed' : 'bg-black'} text-white font-semibold w-full h-[48px] py-3 mt-4 rounded-3xl uppercase flex justify-center items-center`}
                        disabled={isLoading}
                    >
                        {isLoading ? <BtnLoading /> : "reset Password"}
                    </button>
                </form>

                <div onClick={() => navigate('/register')} className='flex underline text-sm font-semibold items-center mt-3 cursor-pointer'>
                    <MdKeyboardArrowLeft fontSize={'1.3rem'}/>
                    Back to Login page
                </div>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword
