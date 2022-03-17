import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import axios from "../api/axios";

const LOGIN_URL = "/login";

export const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ email, roles, accessToken });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        toast.error("Ei vastausta palvelimelta");
      } else {
        toast.error(error.response.data.message);
      }
      setIsLoading(false);
    }
  };

  const togglePersist = () => {
    setPersist(prev => !prev);
  }

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist])

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className="container">
          <h1>Kirjaudu</h1>
          <div className="row" style={{ textAlign: "left" }}>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  autoComplete="off"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password1"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Kirjaudu
              </button>
              <div>
                <input 
                type="checkbox"
                id="persist" 
                onChange={togglePersist}
                checked={persist}
                />
                <label htmlFor="persist">Pysy kirjautuneena</label>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
