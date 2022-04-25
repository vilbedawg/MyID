import { useState } from "react";
import DashboardID from "../components/DashboardID";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Loader } from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Placehodler from "../components/DashboardComponents/DashPlaceholder";
import DataError from "../components/DashboardComponents/DataError";


export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['invalid_tx']);
  const [data, setData] = useState();
  const [notValid, setNotValid] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState("Default");

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
    } catch (error) {
      toast.error(error.response.data?.message);
      toast.error(error.response.data);
    }
    setIsLoading(false);
  }

  const GoTo = () => {
    navigate('/addnew');
  }
  const changeState = (newState) => {
    setState(newState)
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
            data={data.data}
            path={`../uploads/${data ? data.data.picture : 'morbius-rawr.gif'}`}
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

      <div className="mobileIDList">
      <select onChange={  (event) => getMyCard(event.target.value)}>
        <option hidden >Valitse tunnistautuminen</option>
        <option value={process.env.REACT_APP_AJOKORTTI}>Ajokortti</option>
        <option value={process.env.REACT_APP_PASSI}>Passi</option>
        <option value={process.env.REACT_APP_KELAKORTTI}>Kelakortti</option>
      </select>

      {state === "Placeholder" && <Placehodler />}
      {state === "Ajokortti" && <Placehodler />}
      {}
      </div>
    </>
  )
}
