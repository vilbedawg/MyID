import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../auth/authSlice'
import Spinner from '../components/Spinner'

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  
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
   
    if(password !== password2) {
      toast.error('Salasana ei täsmää');
    } 
    else {
      const userData = {
        email,
        password
      }
      dispatch(register(userData));
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <div>
    <h1>Register</h1>
    <div className='row' style={{textAlign: 'left'}}>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="Password1" required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="mb-3">
            <label className="form-label">Repeat password</label>
            <input type="password" className="form-control" id="Password2" required value={password2} onChange={(e) => setPassword2(e.target.value)}/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
    </div>
  )
}