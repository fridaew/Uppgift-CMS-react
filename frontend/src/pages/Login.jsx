import React from 'react'
import { useState } from 'react'
import axios from 'axios'

import { useNavigate, Navigate, useLocation} from 'react-router-dom'

const Login = ({setUser, user}) => {

  const [token, setToken] = useState(null);


  const [errorMessage, setErrorMessage] = useState(null);

  if (user != null) {
    return <Navigate to="/" />
  }

  
  const navigate = useNavigate()
  const { state } = useLocation()


  const [formData, setFormData] = useState({
    email: '',
    password: ''

  })

  const handleChange = e => {
    setFormData(prevData => {
      return {
        ...prevData,
        [e.target.name]: e.target.value
      }
    })

    setErrorMessage(null)

  }


  



  const handleSubmit = async e => {
    e.preventDefault()
   
    try {
      const res = await axios.post('http://localhost:9998/api/users/login/', formData) // MED AXIOS
      
      const token = res.data; // Assign the entire response data to the token
      console.log('Token:', token);
      setToken(token);


      setUser(res.data)
      navigate(state?.from || '/')
    } catch (error) {
      console.log('error response', error.response);
      setErrorMessage(error.response.data.message)
   }
}

  


  return (

    <div className='form-page'>
      <h1 className='login-h1'>Login to your account</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' id='email' value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" name='password' id='password' value={formData.password} onChange={handleChange} />
        </div>
        {/* { loading && <p>Loading...</p>}
        {error && <p>{error}</p>} */}
         {errorMessage && <p className="error">{errorMessage}</p>} 
        <button className="btn btn-primary">LOGIN</button>

       
      </form>
    </div>

  )
}

export default Login



