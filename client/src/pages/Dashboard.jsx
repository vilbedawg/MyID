import { useState } from "react";
import DashboardID from "../components/DashboardID";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link, Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [notChanged, setNotChanged] = useState(true); // tsekkaa onko tietoja muutettu ja tallennetaan tähän. FALSE jos on..
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();

  const getMyCard = async (type) => {
    try {
      const [request1, request2] = await Promise.all([
        axiosPrivate.get(
          process.env.REACT_APP_USER,
           {params: { type }}),
        axiosPrivate.get(
          process.env.REACT_APP_CHECK,
           {params: { type }})
      ])
      setData(request1.data);
      setNotChanged(request2.data);
      console.log(request2.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isLoading ? <Spinner /> : null}
      {auth?.roles.length > 1 ? <Navigate replace to="/blocks" /> : null}
      <div className="navbarPlaceholder"></div>
      {
        data && notChanged 
      ? 
      (
        <div className="dashboardRight">
          <DashboardID
            accepted={data ? data.transaction.accepted : null}
            ID={data ? data.transaction.toAddress : null}
            name={data ? data.transaction.data.body.name : null}
            country={data ? data.transaction.data.body.country : null}
            bday={data ? data.transaction.data.body.bday : null}
            path={`../uploads/${data ? data.transaction.data.picture : 'morbius-rawr.gif'}`}
          /> 
        </div>
      )
      :
      (
        notChanged 
        ?
        <div className="dashboardRight">
          <h1>Placeholder...</h1>
        </div>
        :
        <div className="dashboardRight">
          <img src="./images/sponge.png" style={{width: '50%', height: '50%'}}/>
          <h1>Tietoja muutettu</h1>
        </div>
      )
      }
      
      <div className="dashboardLeft">
          <ul className="IDlist">
            <li>
              <Link to="/Addnew">
                Lisää uusi
              </Link>
            </li>
            <li>
              <button className="logoutBtn" onClick={() => getMyCard(process.env.REACT_APP_AJOKORTTI)}>
                Ajokortti</button>
            </li>
            <li>
              <button className="logoutBtn" onClick={() => getMyCard(process.env.REACT_APP_PASSI)}>
                Passi</button>
            </li>
            <li>
              <button className="logoutBtn" onClick={() => getMyCard(process.env.REACT_APP_KELAKORTTI)}>
                Kelakortti</button>
            </li>
          </ul>
      </div>
    </>
  )
}
