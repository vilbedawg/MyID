import React, { useState } from 'react'
import axios from "axios";

const onSubmit = (e) => {
  e.preventDefault();
  axios.post("http://localhost:5000/register")
}


export const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  })

  const { email, password, password2 } = formData;
  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.email] : e.target.value,
    }))
  }

  return (
    <div>
    <h1>Register</h1>
    <div className='row' style={{textAlign: 'left'}}>
        <form onSubmit={onSubmit}>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={onChange}/>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword2" className="form-label">Repeat password</label>
            <input type="password" className="form-control" id="exampleInputPassword2" value={password2} onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        </form>
    </div>
    </div>
  )
}
