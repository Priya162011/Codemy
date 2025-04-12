import React from 'react'
import error from "../assets/error.gif"
function ErrorPage() {
  return (
    <div className='container-fuild'>
        <img src={error} alt='404! Page Not Found' className='img-fluid'/>
    </div>
  )
}

export default ErrorPage