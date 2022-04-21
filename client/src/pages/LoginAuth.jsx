import { useEffect, useState } from "react"
import { Navigate } from "react-router";
import Spinner from "../components/Spinner"
import useAxiosPrivate from "../hooks/useAxiosPrivate";


export const LoginAuth = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const checkCards = async () => {
            const [request1] = await Promise.all([
            axiosPrivate.get(
                process.env.REACT_APP_CHECK,
                {signal: controller.signal})
            ]);
            setIsLoading(false);
        }

        checkCards();
        return () => {
          isMounted = false;
          controller.abort();
        }
    }, [])

  return (
    <>
        
        {!isLoading ? <Navigate to={'/'} replace={true}/> : <Spinner />}
        
    </>
  )
}
