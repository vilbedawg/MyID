import { useEffect, useState } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import {shortenAddress} from '../utils/shortenAddress';
import useAuth from "../hooks/useAuth";

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
        params: { type: role}
      });
      isMounted && setTransactions(response.data);
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
        transactions?.map(tx =>
        <div>
          <p key={tx._id}>{shortenAddress(tx.fromAddress)}</p>
        </div>
        )}
      <button className="btn btn-primary" onClick={startMiner}>Lisää</button>
    </div>
  )
}
