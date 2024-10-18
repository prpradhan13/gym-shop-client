import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUser } from "../../context/userContext";
import BtnLoading from "../loading/BtnLoading";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {auth, setAuth} = useUser();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/login`, {userName, password})

      if(data.success){
        setAuth({
          ...auth,
          user: data.user,
        })

        localStorage.setItem('auth',JSON.stringify({ user: data.user }));
        
        navigate('/');
        toast.success(data.message);

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while logging in');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full mt-[2rem] px-10">
      <form className="flex flex-col items-center gap-6" onSubmit={handleLogin}>
        <div className="w-full">
          <div className="flex flex-col">
            <label htmlFor="userName" className="font-semibold text-sm">
              Username:
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="flex flex-col mt-[1rem]">
            <label htmlFor="password" className="font-semibold text-sm">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 outline-none border border-[#cfcfcf] rounded-md text-sm"
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <Link
          to={"/forgotpassword"}
          className="font-semibold underline text-sm"
        >
          Forgot Password?
        </Link>

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

export default Login;
