import React from 'react'

const LoginForm = () => {
  return (
    <div className='form-page'>
      <h1>Login to your account</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' id='email'/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name='password' id='password'  />
        </div>
        <button className="btn btn-primary">LOGIN</button>
      </form>
    </div>
  )
}

export default LoginForm