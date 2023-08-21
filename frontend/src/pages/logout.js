import React from 'react';
// import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
  });

function Logout (e) {
    const navigate = useNavigate();

    function submitLogout(e) {
        e.preventDefault();
        client.post(
          "/api/logout/",
          {withCredentials: true}
        ).then(function(res) {
          navigate("/login");
        });
      }
}

export default Logout