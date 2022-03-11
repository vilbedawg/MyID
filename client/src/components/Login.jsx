import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../auth/authSlice'
import Spinner from '../components/Spinner'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth); 

  useEffect(() => {
    if(isError) {
      toast.error(message);
    }

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset);

  }, [user, isError, isSuccess, message, navigate, dispatch])


  const onSubmit = (e) => {
    e.preventDefault();

      const userData = {
        email,
        password
      }

      dispatch(login(userData));
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div>
    <h1>Kirjaudu</h1>
    <div className='row' style={{textAlign: 'left'}}>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="Password1" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Kirjaudu</button>
        </form>
    </div>
    </div>
  )
}
