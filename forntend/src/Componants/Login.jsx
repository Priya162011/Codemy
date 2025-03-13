import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { checklogin } from './Slices/LoginSlice';

function Login() {
    const [formdata, setformdata] = useState({ username: '', password: '' });
    const error = useSelector((state) => state.Login.error);
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setformdata({ ...formdata, [name]: value });
      };
    const handleLogin=(e)=>{
        e.preventDefault()
        dispatch(checklogin({...formdata,navigate}))
    }
  return (
    <div>
      <div className="containers">
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <div className="input-box">
              <input type="text" placeholder="Username" name='username' required onChange={handleChange} value={formdata.username}/>
              <i className='bx bxs-user'></i>
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" name="password" required onChange={handleChange} value={formdata.password}/>
            <i className='bx bxs-lock-alt'></i>
          </div>
          <div className="remember-forget">     

          </div><br/>
          {error && <p style={{ color: "red"}}>{error}</p>}
          <button type="submit" className="btn">Login</button>
          
          {/* <div className="register-link">
            <Link to="/forget-password">Forget password?</Link>
          </div> */}
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login