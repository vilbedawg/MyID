import { useEffect, useState } from "react"
import { Navigate } from "react-router";
import Spinner from "../components/Spinner"
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

export const LoginAuth = () => {
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const checkCards = async () => {
            await axiosPrivate.get(process.env.REACT_APP_CHECK, {signal: controller.signal});
            isMounted && setIsLoading(false);
        }
        
        checkCards();
        return () => {
          isMounted = false;
          controller.abort();
        }
    }, [])

  return (
    <>
        {
          isLoading 
          ? <Spinner />
          : auth?.roles.length > 1
            ? <Navigate replace to="/transactions" />
            : <Navigate replace to="/" />
        }
    </>
  )
}
