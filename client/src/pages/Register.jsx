import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";

// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const REGISTER_URL = '/register';

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [success, setSuccess] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const validPwd = password === matchPwd;

    if(!validPwd) {
      toast.error('Salasanat eivät täsmää');
    }
  
    try {
      const response = await axios.post(REGISTER_URL, 
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      setEmail('');
      setPassword('');
      setMatchPwd('');
    } catch (error) {
      if(!error?.response) {
        toast.error('Ei vastausta palvelimelta');
      } else {
        toast.error(error.response.data.message)
      }
    }
  };

  return (
    <>
      {success ? (
        <div>
          <h1>Rekisteröinti onnistui</h1>
          <p>
            <Link to={'/login'}>Kirjaudu sisään </Link>
          </p>
        </div>
      ) : (
        <div className="antiHero">
          <h1>Rekisteröidy</h1>
          <div>
            <form onSubmit={onSubmit}>
                <div className="antiHeroInputs">
                  <input
                    placeholder="Sähköposti"
                    type="email"
                    id="email"
                    autoComplete="off"
                    required
                    onChange={(e) => setEmail(e.target.value)}/>
                  <input
                    placeholder="Salasana"
                    type="password"
                    id="password1"
                    required
                    onChange={(e) => setPassword(e.target.value)}/>
                  <input
                    placeholder="Salasana uudelleen"
                    type="password"
                    id="password2"
                    required
                    onChange={(e) => setMatchPwd(e.target.value)}/>
                  <button type="submit">
                    Rekisteröidy
                  </button>
                </div>
            </form>
        </div>
        </div>
      )}
      <div className="LoginPic">
              <img src="./images/LoginPic.png" className="loginImage"></img>
      </div>
    </>
  );
};
