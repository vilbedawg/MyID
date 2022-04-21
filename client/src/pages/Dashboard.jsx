import { useState } from "react";
import DashboardID from "../components/DashboardID";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link, Navigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import useAuth from "../hooks/useAuth";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [cookies, setCookie, removeCookie] = useCookies(['invalid_tx']);
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
      setData(request.data);
      const isChanged = cookies.invalid_tx.some(item => item.toAddress === type);
      setNotValid(isChanged);
      console.log(isChanged);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  const GoTo = () => {
    navigate('/addnew');
  }

  return (
    <>
      {auth?.roles.length > 1 ? <Navigate replace to="/blocks" /> : null}
      {
        data && !notValid 
      ? 
      (
        <div className="dashboardRight">
        {isLoading 
        ? <Loader /> 
        : <DashboardID
            accepted={data ? data.transaction.accepted : null}
            ID={data ? data.transaction.toAddress : null}
            name={data ? data.transaction.data.body.name : null}
            country={data ? data.transaction.data.body.country : null}
            bday={data ? data.transaction.data.body.bday : null}
            path={`../uploads/${data ? data.transaction.data.picture : 'morbius-rawr.gif'}`}
          /> }
        </div>
      )
      :
      (
        notValid  
        ?
        <div className="dashboardRight">
          <img src="./images/sponge.png" style={{width: '50%', height: '50%'}}/>
          <h1>Tietoja muutettu</h1>
        </div>
        :
        <div className="dashboardRight">
          <h1>Placeholder...</h1>
        </div>
      )
      }
      
      <div className="dashboardLeft">
          <ul className="IDlist">
            <li>
              <button className="logoutBtn" onClick={GoTo}>
                Lisää uusi</button>
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
