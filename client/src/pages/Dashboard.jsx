import { useState } from "react";
import DashboardID from "../components/DashboardID";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Loader } from "../components/Loaders/Loader";
import useAuth from "../hooks/useAuth";
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Placehodler from "../components/DashboardComponents/DashPlaceholder";
import DataError from "../components/DashboardComponents/DataError";
import useLogout from "../hooks/useLogout";

export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['invalid_tx']);
  const [data, setData] = useState();
  const [notValid, setNotValid] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const getMyCard = async (type) => {
    setIsLoading(true);
    try {
      const request = await axiosPrivate.get(
        process.env.REACT_APP_USER,
         {params: { type }}
        )
      setData(request.data.transaction);
      const isChanged = cookies.invalid_tx.some(item => item.toAddress === type && request.data.transaction.timestamp === item.timestamp);
      setNotValid(isChanged);
      if(!request.data.transaction) {
        toast.info('Sinulla ei ole tallenttuja tietoja');
      }
    } catch (error) {
      toast.error(error.response.data?.message);
      toast.error(error.response.data);
      if(error.response.status === 403) {
        await logout();
        navigate("/login");
      }
    }
    setIsLoading(false);
  }

  const GoTo = () => {
    navigate('/addnew');
  }

  return (
    <>
      {auth.roles.length > 1 && <Navigate to={'/transactions'}/>}
      {
        data && !notValid 
      ? 
      (
        <div className="dashboardRight">
        {isLoading 
        ? <Loader /> 
        : <DashboardID
            valid={data.accepted}
            data={data.data}
            path={`../uploads/${data ? data.data.picture : 'sponge.png'}`}
          /> }
        </div>
      )
      :
      (
        notValid  
        ?
          <DataError />
        :
          <Placehodler />
      )
      }
      
      <div className="dashboardLeft">
          <ul className="IDlist">
            <li>
              <button className="logoutBtn" onClick={GoTo}>
                + Lisää uusi</button>
            </li>
            <li>
              <button className="IDBtn" disabled={isLoading} onClick={() => getMyCard(process.env.REACT_APP_AJOKORTTI)}>
                Ajokortti</button>
            </li>
            <li>
              <button className="IDBtn" disabled={isLoading} onClick={() => getMyCard(process.env.REACT_APP_PASSI)}>
                Passi</button>
            </li>
            <li>
              <button className="IDBtn" disabled={isLoading} onClick={() => getMyCard(process.env.REACT_APP_KELAKORTTI)}>
                Kelakortti</button>
            </li>
          </ul>
      </div>

      <button className="addBtn" onClick={GoTo}>+ Lisää</button>
      <div className="mobileIDList">
      <select onChange={  (event) => getMyCard(event.target.value)}>
        <option hidden >Valitse tunnistautuminen</option>
        <option value={process.env.REACT_APP_AJOKORTTI}>Ajokortti</option>
        <option value={process.env.REACT_APP_PASSI}>Passi</option>
        <option value={process.env.REACT_APP_KELAKORTTI}>Kelakortti</option>
      </select>
      </div>
    </>
  )
}
