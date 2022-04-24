import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { useNavigate } from "react-router";
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;


export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();


  const onLogin = () => {
    navigate('/login', {replace: true})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const validPwd = password === matchPwd;

    if(!validPwd) {
      toast.error('Salasanat eivät täsmää');
    }
  
    try {
        await axios.post(
        process.env.REACT_APP_REGISTER, 
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );
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
        <div className="antiHero">
          <h1>Rekisteröinti onnistui</h1>
          <div className="antiHeroInputs">
            <button type="submit" onClick={onLogin}>
              Kirjaudu sisään
            </button>
          </div>
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
              <img src="./images/LoginPic.png" alt="register_img" className="loginImage"></img>
      </div>
    </>
  );
};
