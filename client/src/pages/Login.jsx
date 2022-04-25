import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import axios from "../api/axios";



export const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_LOGIN,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, roles, accessToken });
      setEmail("");
      setPassword("");
      navigate('/check', { replace: true });
    } catch (error) {
      if (!error?.response) {
        toast.error("Ei vastausta palvelimelta");
      } else {
        toast.error(error.response.data?.message);
        toast.error(error.response.data);
      }
      setIsLoading(false);
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);



  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          
          <div className="antiHero">
              <form onSubmit={onSubmit}>
                

                <div className="antiHeroInputs">
            <h1>Kirjaudu</h1>
                  
                  <input
                    placeholder="Sähköposti"
                    type="email"
                    id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}/>

                  <input
                    placeholder="Salasana"
                    type="password"
                    id="password1"
                    onChange={(e) => setPassword(e.target.value)}/>
                  <br/>
                  <input 
                    type="checkbox"
                    id="persist" 
                    onChange={togglePersist}
                    checked={persist}/>

                    <label htmlFor="persist">Pysy kirjautuneena</label>
                    <br/><br/>
                  <button type="submit">
                    Kirjaudu
                  </button>
                </div>

              </form>

          </div>
         
              <img src="./images/LoginPic.png" alt="login_pic" className="loginImage"></img>
        
        </>
      )}
    </>
  );
};
