import React from 'react'
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className='login_page'>
        
    <div className="wrapper">
        <form action="">
        <h1>Login</h1>
        <div className="input-box">
            <input type="text" placeholder="Username" required/>
    </div>
    <dive className="input-box">
        <input type="password" placeholder="Password" required/>
    </dive>
    <dive className="remember-forget">     

</dive><br/>
<button type="submit" className="btn">
        <Link to="dashboard">Login</Link>
</button>
<div className="register-link">
	<a href="#">Forget password?</a>
</div>

</form>
</div>
  
    </section>
  )
}

export default Login