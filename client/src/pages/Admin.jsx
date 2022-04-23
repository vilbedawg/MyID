import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import { Loader } from "../components/Loader";
import TableComponent from "../components/TableComponent";

export const Admin = () => {
  const [transactions, setTransactions] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const role = auth?.roles[1];




  const columns = [
    {heading: 'Osoite', value: 'fromAddress'},
    {heading: 'Tyyppi', value: 'toAddress'},
    {heading: 'Allekirjoitus', value: 'signature'},
    {heading: 'Lähetetty', value: 'timestamp'},
    {heading: 'Status', value: 'accepted'},
    {heading: 'Tarkista', value: 'tarkista'}
    
  ]
  
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTransactions = async () => {
      const response = await axiosPrivate.get(
        process.env.REACT_APP_TRANSACTIONS, {
        signal: controller.signal,
      });

      if(response.data.length <= 0) {
        isMounted && setIsEmpty(true);
      }
      
      isMounted && setTransactions(response.data);
    };

    getTransactions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const startMiner = async () => {
    try {
      const response = await axiosPrivate.post(
        process.env.REACT_APP_ADDBLOCK, {
        params: {
          transactions,
          type: role,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
          <div className="addNew">
           {
             transactions.length > 0 ? (
              <>
                <TableComponent data={transactions} column={columns} />
                <button onClick={startMiner} className="logoutBtn danger">Lisää</button>
              </>
           ) : isEmpty
              ? <h1>No data</h1>
              : <Loader />
           }
          </div>
  );
};
