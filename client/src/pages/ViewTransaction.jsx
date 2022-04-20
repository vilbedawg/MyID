import { useEffect, useState } from "react";
import { useParams } from "react-router"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

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
          console.error(error)
        }
      }

  return (

    <div className="container" style={{textAlign: "left", wordBreak: "break-word"}}>
      {
        data && dataBody
        ?
        (
          <>
            <p>Osoite: {data.fromAddress}</p>
            <p>Tyyppi: {data.toAddress}</p>
            <p>Allekirjoitus: {data.signature}</p>
            <p>Aikaleima: {data.timestamp}</p>
            <img src={`../uploads/${dataBody?.picture}`} alt='picture'/>
            <p>nimi: {dataBody?.body?.name}</p>
            <p>syntymäaika: {dataBody?.body?.bday}</p>
            <button
              className="btn btn-success"
              onClick={() => handleTransaction(true)}>Hyväksy</button>
            <button
              className="btn btn-danger"
              onClick={() => handleTransaction(false)}>Hylkää</button>
            <br />
            <br />
            <Link to={"/blocks"}>Takaisin</Link>
            <br />
            <br />
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
