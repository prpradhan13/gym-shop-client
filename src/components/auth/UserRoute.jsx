import axios from 'axios';
import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom';

const UserRoute = () => {
    const [ok, setOk] = useState(null);

    useEffect(() => {
        const fetchUserAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/user/user-auth`)
                
                if(res.status === 200 && res.data?.ok){
                    setOk(true);
                } else {
                    setOk(false);
                }

            } catch (error) {
                console.log('Error fetching user authentication:', error);
                setOk(false);
            }
        };

        fetchUserAuth();
    }, []);

    if (ok === null) {
        return "Loading...";
    }

  return ok ? <Outlet /> : "Invalid user authentication"
}

export default UserRoute
