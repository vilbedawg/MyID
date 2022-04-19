import { useState } from "react";
import DashboardID from "../components/DashboardID";
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { Link } from "react-router-dom";

export default function Dashboard() {
  const axiosPrivate = useAxiosPrivate();
  const [data, setData] = useState();
  const [isChanged, setIsChanged] = useState(true);

  const getMyCard = async (type) => {
    try {

      const [request1, request2] = await Promise.all([
        axiosPrivate.get('/user', {params: { type }}),
        axiosPrivate.get('/blocks/check', {params: { type }})
      ])
      setData(request1.data);
      setIsChanged(request2.data);
      console.log(request2.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="navbarPlaceholder"></div>
      {
        data && isChanged 
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
        isChanged 
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
