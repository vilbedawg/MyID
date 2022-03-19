import { useEffect, useState } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {shortenAddress} from '../utils/shortenAddress';
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

export const Admin = () => {
  const [transactions, setTransactions] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const role = auth?.roles[1];

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTransactions = async () => {
      const response = await axiosPrivate.get('/transactions', {
        signal: controller.signal,
        params: { type: role }
      });
      isMounted && setTransactions(response.data);
      console.log(response.data)
    }

    getTransactions();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  const startMiner = async() => {
    try {
      const response = await axiosPrivate.post('/blocks/add', {
        params: { 
          transactions,
          type: role
         }
      });
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div className="container">
      {
        transactions
        ?
        (
          <>
            {transactions?.map(tx =>
              <div>
              {console.log(tx.valid)}
                <Link to={`/blocks/${tx.fromAddress}`} key={tx.fromAddress}>{shortenAddress(tx.fromAddress)} 
                {
                  tx.valid
                ? <span style={{color: "green"}}> True</span> 
                : tx.valid === undefined  
                ? <span style={{color: "orange"}}> ODOTTAA</span>
                : <span style={{color: "red"}}> False</span>
                }
                </Link>
              </div>
            )}
            <button className="btn btn-primary" onClick={startMiner}>Lisää</button>
          </> 
        )
        :
        (
          <Spinner />
        )
      }
    </div>
  )
}
