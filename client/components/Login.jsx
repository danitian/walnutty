import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const handleLoginSubmit = (e) => {
    console.log('login submitted!')

    axios.post('/api/login', { username, password })
      .then(({ data }) => {
        console.log('login data: ', data);
        if (data === "Authenticated") {
          console.log('Authenticated, welcome');
        } else {
          console.log('Auth failed');
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>
        LOGIN
      </div>
      <div>
        <div>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange} />
          </label>
          <button
            type="button"
            onClick={handleLoginSubmit}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Login;