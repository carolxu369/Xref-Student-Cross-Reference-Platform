import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const HeaderComponent = () => {
  const client = axios.create({
    baseURL: ""
  });

  const navigate = useNavigate();

  return (
    <div>
      <header className='header-container'>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            {/* <Link to="/"  className = "navbar-brand"> Home </Link> */}
            <Link to="/person" className="navbar-brand offset-md-1"> Xref | </Link>
            <Link to="/person" className="navbar-brand"> People List </Link>
            <Link to="/csv" className="navbar-brand"> CSV List </Link>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent
