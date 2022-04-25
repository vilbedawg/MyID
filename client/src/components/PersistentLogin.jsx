import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";

const PersistLogin = () => { 
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error(error);
            } finally {
                setTimeout(() => {
                    isMounted && setIsLoading(false);
                }, 1000);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    return (
        <>
            {
            !persist 
                ? <Outlet />
                : isLoading
                    ? <Spinner /> 
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin;