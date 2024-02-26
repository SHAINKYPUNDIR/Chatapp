// Join.js
import React, { useState } from 'react';
import "./join.css";
import favicon from "../../images/favicon.png";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className='JoinPage'>
      <div className='JoinContainer'>
        <img src={favicon} alt='logo' />
        <h1>MyChat</h1>
        <input onChange={handleNameChange} type='text' placeholder="Enter Your Name" id='joinInput' />
        <Link onClick={(event) => !name ? event.preventDefault() : null} to={`/chat?name=${name}`}>
          <button className='joinBtn'>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
