import { useEffect, useState } from "react";
import { useParams } from "react-router"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Loader } from "../components/Loader";
import { Link } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";

export const ViewTransaction = () => {
    const params = useParams();
    const [data, setData] = useState('');
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTransaction = async () => {
          const response = await axiosPrivate.get(
            `${process.env.REACT_APP_TRANSACTIONS}/${params.id}`, {
            signal: controller.signal
          });
          isMounted && setData(response.data);
        }
        getTransaction();
        return () => {
          isMounted = false;
          controller.abort();
        }
      }, []);


  return (
    <>
      <div className="dashboardRight transactions">
      <Link to={"/transactions"} className="back-text">Takaisin</Link>
        {
            data ? (
              <>
                <span className="publicKey">Osoite: {data.fromAddress}</span>    
                <TransactionForm data={data.data} type={data.toAddress}/>
              </>
            ) : <Loader />
          }  
      </div>
    </>
  );
}
