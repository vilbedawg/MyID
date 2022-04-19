import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { shortenAddress } from "../utils/shortenAddress";
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
      const response = await axiosPrivate.get("/transactions", {
        signal: controller.signal,
      });
      isMounted && setTransactions(response.data);
      console.log(response.data);
    };

    getTransactions();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const startMiner = async () => {
    try {
      const response = await axiosPrivate.post("/blocks/add", {
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
    <>
      {transactions ? (
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            marginTop: "20%",
          }}
        >
          {transactions?.map((tx, key) => (
            <Link to={`/blocks/${tx.fromAddress}`} key={key}>
              {shortenAddress(tx.fromAddress)}
              {tx.accepted ? (
                <span style={{ color: "green" }}> True</span>
              ) : tx.accepted === undefined ? (
                <span style={{ color: "orange" }}> ODOTTAA</span>
              ) : (
                <span style={{ color: "red" }}> False</span>
              )}
            </Link>
          ))}
          <button
            className="btn btn-primary"
            onClick={startMiner}
            style={{ width: "50px" }}
          >
            Lisää
          </button>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};
