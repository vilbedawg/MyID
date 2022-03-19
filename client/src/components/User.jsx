import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from "../hooks/useLogout";
import  Spinner  from "../components/Spinner";
const PASSI = 'Passi';
const AJOKORTTI = 'Ajokortti'
const KELAKORTTI = 'Kelakortti';
 
export const User = () => {
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const logout = useLogout();
    
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
          console.log(error);
          // await logout();
          // navigate('/login', { state: { from: location }, replace: true })
        }
      }
      getUser();
      return () => {
        isMounted = false;
        controller.abort();
      }
    }, []);
  
    
    const getMyCard = async (type) => {
      try {
        const [request1, request2] = await Promise.all([
          axiosPrivate.get('/user', {params: { type }}),
          axiosPrivate.get('/blocks/check', {params: { type }})
        ])
        console.log(request1.data);
        console.log(request2.data);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div className='container'>
          {
          user 
          ? (
            <p>
              {user.email}
            </p> 
            )
          : <Spinner />}
            <button className="btn btn-primary" onClick={() => getMyCard(PASSI)}>Passi</button>
            <button className="btn btn-primary" onClick={() => getMyCard(AJOKORTTI)}>Ajokortti</button>
            <button className="btn btn-primary" onClick={() => getMyCard(KELAKORTTI)}>Kelakortti</button>
      </div>
    )
}
