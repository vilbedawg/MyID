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
        <section>
          <h1>Rekisteröinti onnistui</h1>
          <p>
            <Link to={'/login'}>Kirjaudu sisään </Link>
          </p>
        </section>
      ) : (
        <section className="container">
          <h1>Rekisteröinti</h1>
          <div className="row" style={{ textAlign: "left" }}>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Sähköposti
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
                <label htmlFor="password1" className="form-label">
                  Salasana
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password1"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password2" className="form-label">
                  Salasana uudelleen
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  required
                  onChange={(e) => setMatchPwd(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Rekisteröidy
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};
