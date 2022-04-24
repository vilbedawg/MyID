import { useState } from "react";
import DashboardID from "../components/DashboardID";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Loader } from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies] = useCookies(['invalid_tx']);
  const [data, setData] = useState();
  const [notValid, setNotValid] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const navigate = useNavigate();

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
            accepted={data ? data.accepted : null}
            ID={data ? data.Tyyppi : null}
            name={data ? data.data.Nimi : null}
            country={data ? data.data.Maa : null}
            bday={data ? data.data.Henkilötunnus : null}
            path={`../uploads/${data ? data.data.picture : 'morbius-rawr.gif'}`}
          /> }
        </div>
      )
      :
      (
        notValid  
        ?
        <div className="dashboardRight">
          <img src="./images/sponge.png" alt="sponge" style={{width: '50%', height: '50%'}}/>
          <h1>Tietoja muutettu</h1>
        </div>
        :
        <div className="dashboardRight">
          <img className="placeholder" src="./images/placeholder.png" alt="dashboard_placeholder" style={{height: 'auto', width: '100%', maxWidth: '400px'}}></img>
        </div>
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
    </>
  )
}
