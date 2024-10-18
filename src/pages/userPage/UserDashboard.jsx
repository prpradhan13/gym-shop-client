import axios from "axios";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

function UserDashboard() {
  const { auth, setAuth } = useUser();
  const navigate = useNavigate();
  const user = auth.user;

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/logout`);

      setAuth({ ...auth, user: null });
      localStorage.removeItem("auth");

      navigate("/register");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get initials from the full name
  const getInitials = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    return nameParts.length === 1
      ? fullName.slice(0, 2).toUpperCase()
      : nameParts
          .map((name) => name[0])
          .join("")
          .toUpperCase();
  };

  const userNameInitials = useMemo(() => getInitials(user?.fullName), [user?.fullName]);

  /* You can certainly write the JSX for the userAddressList directly within the return statement of your component. 
    The main reason to compute it separately (as done with userAddressList) is to keep your return block clean and improve readability, 
    especially when dealing with complex logic or conditionals.
  */
  const userAddress = useMemo(() => {
    return user?.address?.map((address) => (
      <div key={address._id} className="p-2 my-2 bg-white border rounded">
        <p className="capitalize">{address.street}</p>
        <p className="capitalize">
          {address.city}, {address.state}, {address.postalCode}
        </p>
        <p className="capitalize">{address.phone}</p>
        <p className="capitalize">{address.country}</p>
      </div>
    ));
  }, [user?.address]);

  return (
    <div className="w-full font-Monts py-10 px-5">
      <div className="">
        <h1 className="uppercase font-bold text-2xl">your gymshark account</h1>
        <div className="">
          
        </div>
      </div>

      {/* User Details */}
      <div className="w-full py-9 flex gap-3 items-center">
        <div className="w-[15vw] h-[13vw]">
          <div className="bg-black text-white rounded-full w-full h-full flex justify-center items-center font-bold text-xl">
            {userNameInitials ? userNameInitials : "User"}
          </div>
        </div>
        <div className="w-full flex flex-col items-start gap-2 overflow-hidden">
          <h2 className="uppercase font-bold"> {user?.fullName} </h2>
          <p className="text-[#7e7e7e] font-medium text-sm">{user?.email}</p>
          <button className="underline font-bold" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      {/* User Orders */}
      <div className="my-3">
        <h1 className="uppercase font-bold text-xl">your oreders</h1>
        <div className="h-[30vh] flex flex-col justify-center items-center bg-slate-300">
          <h1 className="uppercase font-bold ">no orders</h1>
          <p> You&apos;ve made no orders </p>
        </div>
      </div>

      {/* User Address */}
      <div className="p-3 bg-[#e7e7e7]">
        <h1 className="uppercase font-bold">address book</h1>
        <div className="">
          {userAddress?.length > 0 ? userAddress : <p>No addresses found</p>}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
