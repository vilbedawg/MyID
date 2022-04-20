import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { shortenAddress } from "../utils/shortenAddress";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import TableComponent from "../components/TableComponent";

export const Admin = () => {
  const [transactions, setTransactions] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const role = auth?.roles[1];
  const columns = [
    {heading: 'Osoite', value: 'fromAddress'},
    {heading: 'Tyyppi', value: 'toAddress'},
    {heading: 'Allekirjoitus', value: 'signature'},
    {heading: 'Lähetetty', value: 'timestamp'},
    {heading: 'Status', value: 'accepted'}
  ]
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getTransactions = async () => {
      const response = await axiosPrivate.get(
        process.env.REACT_APP_TRANSACTIONS, {
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
    <>
      {transactions ? (
        <>
          <div className="navbarPlaceholder"></div>
          <div className="dashboardRight">
            <TableComponent data={transactions} column={columns} />



            {/* {transactions?.map((tx, key) => (
              <Link to={`${process.env.REACT_APP_BLOCKS}/${tx.fromAddress}`} key={key}>
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
              onClick={startMiner}
              style={{ width: "50px" }}
            >
              Lisää
            </button> */}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};
