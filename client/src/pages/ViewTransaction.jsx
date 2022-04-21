import { useEffect, useState } from "react";
import { useParams } from "react-router"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import TransactionForm from "../components/TransactionForm";

export const ViewTransaction = () => {
    const params = useParams();
    const [data, setData] = useState('');
    const [dataBody, setDataBody] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const {auth} = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getTransaction = async () => {
          const response = await axiosPrivate.get(
            `${process.env.REACT_APP_TRANSACTIONS}/${params.id}/${auth.roles[1]}`, {
            signal: controller.signal
          });
          console.log(response.data)
          isMounted && setData(response.data);
          isMounted && setDataBody(response.data.data);
        }

        getTransaction();


        return () => {
          isMounted = false;
          controller.abort();
        }
      }, []);

      const handleTransaction = async (value) => {
        try {
          const response = await axiosPrivate.put(
            `${process.env.REACT_APP_HANDLE}/${params.id}`, {value});
          console.log(response.data);
        } catch (error) {
          toast.error(error);
        }
      }

  return (
    <>
      <div className="navbarPlaceholder"/>
      <div className="dashboardRight transactions">
        <div className="transactions-form">
          <TransactionForm 
          data={data}
          />
        </div>

        <div className="buttonGroup">
          <Link to={"/blocks"}>Takaisin</Link>
          <button onClick={() => handleTransaction(true)}>Hyväksy</button>
          <button onClick={() => handleTransaction(false)}>Hylkää</button>
        </div>
        
        
      </div>
    </>
  );
}
