import React from 'react'

export const Signin = () => {
  return (
    <div>
        <h1>Login</h1>
    <div className='row' style={{textAlign: 'left'}}>
        <form>
        <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>
    </div>
  )
}
