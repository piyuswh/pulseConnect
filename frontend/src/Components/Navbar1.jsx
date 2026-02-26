import React from "react";
import { Link,useLocation } from "react-router-dom";
export default function Navbar1(){
  const location=useLocation();
  const pathname=location.pathname;
  return(
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">PulseConnect🩸</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
{pathname!=='/home'&&(
          <Link className="nav-link" to="/home">Home</Link>)}
          {
  ( pathname==="/login"||pathname==='/'||pathname==='/about'||pathname==='/home')&&(
    <Link className="nav-link" to='/register'>Register</Link>
  )
}
{
 ( pathname==="/register"||pathname==='/'||pathname==='/about'||pathname==='/home')&&(
    <Link className="nav-link" to='/login'>Login</Link>
  )
}

        {pathname!=='/about'&&(
          <Link className="nav-link" to="/about">About</Link>)}
      </div>
    </div>
  </div>
</nav>
    </>
  )
}