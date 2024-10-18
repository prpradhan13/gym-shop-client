import { useEffect, useState } from 'react'
import { UserContext } from './userContext'
import axios from 'axios';

const UserContextProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
    });

    const [loading, setLoading] = useState(true); 

    axios.defaults.withCredentials = true; 

    useEffect(() =>{
        const data = localStorage.getItem('auth');
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
            })
        }

        setLoading(false);
        // eslint-disable-next-line 
    },[])

  return (
    <UserContext.Provider value={{auth, setAuth, loading}}>
        {children}
    </UserContext.Provider>
  )
}



export {UserContextProvider};
