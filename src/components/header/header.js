// import './style.css';
import React, {useState} from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import user from '../../assets/user.png'


const Header = () => {
    const cookies = new Cookies();
  
  const a  = cookies.get('user');
  const logout =() => {
      cookies.remove('user');
      window.location.reload(false);
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">

  <a className="navbar-brand" href="#">Navbar </a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
    
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
      {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign out</button> */}
      <div class="dropdown">
  <a   id="dropdownMenuButton" data-toggle="dropdown" style={{cursor:"pointer"}} >
  <img className="profile-photo" src={user} alt={"profile"} height="40px"/>
  </a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" style={{cursor:'pointer'}} onClick={logout}>Log out</a>
  </div>
</div>
    </form>
  </div>
  </div>
</nav>
    )
}
export default Header;