import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from "../hooks/useLogout";

const PASSI = 'Passi';
const AJOKORTTI = 'Ajokortti'
const KELAKORTTI = 'Kelakortti';
 
export const User = () => {
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const logout = useLogout();

    // Get logged in user info
    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();
      const getUser = async () => {
        try {
          const response = await axiosPrivate.get('/userdata', {
            signal: controller.signal
          });
          console.log(response.data);
          isMounted && setUser(response.data);
        } catch (error) {
          await logout();
          navigate('/login', { state: { from: location }, replace: true })
        }
      }
  
      getUser();
  
      return () => {
        isMounted = false;
        controller.abort();
      }
    }, []);
  
    
    const getMe = async (type) => {
      const response = await axiosPrivate.get('/user', {
        params: { type }
      });
      console.log(response);
    }
  
    return (
      <div className='container'>
          {user 
          ? (
            <p>
              {user.email}
            </p> 
            )
          : <p>Ei käyttäjää</p>}
            <button className="btn btn-primary" onClick={() => getMe(PASSI)}>Passi</button>
            <button className="btn btn-primary" onClick={() => getMe(AJOKORTTI)}>Ajokortti</button>
            <button className="btn btn-primary" onClick={() => getMe(KELAKORTTI)}>Kelakortti</button>
      </div>
    )
}
