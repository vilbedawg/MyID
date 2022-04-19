import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from "../hooks/useLogout";
import Spinner  from "../components/Spinner";
import useAuth from "../hooks/useAuth";
 
export const User = () => {
    const [user, setUser] = useState();
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();
  
    
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
      <div>
        {
        auth.accessToken 
      ? (
        <span>{auth.email}</span>
        )
      : ''
      }
          <ul className="IDlist">
            <li>
              <button className="logoutBtn" onClick={() => getMyCard(process.env.REACT_APP_AJOKORTTI)}>Ajokortti</button>
            </li>
            <li>
              <button className="logoutBtn" onClick={() => getMyCard(process.env.REACT_APP_PASSI)}>Passi</button>
            </li>
            <li>
              <button className="logoutBtn" onClick={() => getMyCard(process.env.REACT_APP_KELAKORTTI)}>Kelakortti</button>
            </li>
          </ul>
</div>
    )
}
