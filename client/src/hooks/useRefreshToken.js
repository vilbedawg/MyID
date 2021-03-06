import axios from "../api/axios"
import useAuth from "./useAuth"


const useRefreshToken = () => {
    const  { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            // console.log(prev);
            // console.log(response.data);
            return { 
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken,
                email: response.data.email
             }
        });
        return response.data.accessToken;
    }
  return refresh;
}

export default useRefreshToken