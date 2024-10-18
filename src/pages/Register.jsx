import { useState } from 'react'
import logo from '../assets/gs-icon-black.svg'
import Login from '../components/register/Login'
import Signup from '../components/register/Signup'
import LoginPageImg from '/loginpage_bg.jpg'

function Register() {
  const [isSignupActive, setIsSignupActive] = useState(false)
  const [isLoginActive, setIsLoginActive] = useState(true)

  return (
    <div className='w-full lg:flex h-screen'>
      <div style={{backgroundImage: `url(${LoginPageImg})`}} className="hidden lg:flex w-1/2 bg-cover bg-center">
      </div>

      <div className="w-full h-full lg:flex flex-col justify-center lg:w-1/2 p-5 lg:px-40 font-Monts">
        <div className="flex flex-col items-center gap-6">
          <figure className="">
              <img src={logo} className='h-[6vh] md:h-[4vh] lg:h-[6vh]' alt="Logo"/>
          </figure>
          <h1 className='uppercase font-bold text-xl'> my gymshop </h1>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="w-[60vw] lg:w-[20vw] bg-[#e7e7e7] uppercase font-semibold text-sm rounded-3xl flex p-1">
            <button 
              onClick={() => {
                setIsSignupActive(false)
                setIsLoginActive(true)
              }} 
              className={`w-1/2 uppercase cursor-pointer px-5 py-3 lg:p-2 rounded-3xl ${isLoginActive ? 'bg-white text-black duration-300' : 'text-[#8e8e8e] hover:text-black'}`}
            >
              Log in
            </button>
            <button 
              onClick={() => {
                setIsSignupActive(true)
                setIsLoginActive(false)
              }} 
              className={`w-1/2 uppercase cursor-pointer px-5 py-3 lg:p-2 rounded-3xl ${isSignupActive ? 'bg-white text-black duration-300' : 'text-[#8e8e8e] hover:text-black'}`}
            >
              sign up
            </button>
          </div>

          {isSignupActive ? <Signup setIsSignupActive={setIsSignupActive} setIsLoginActive={setIsLoginActive}/> : <Login/>}
        </div>
      </div>
    </div>
  )
}

export default Register
