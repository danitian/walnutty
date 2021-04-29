import React, { useState, useEffect } from 'react';
import axios from 'axios';

// future:
// add email registration field and check to make sure they don't already have a user at that same email to prevent creating multiple accounts per email, which is preferred in many cases
// add 2nd password field to confirm that the two match when signing up

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');

  const handleChange = (e) => {
    const targetName = e.target.name;
    const targetValue = e.target.value;

    if (targetName === 'username') {
      setUsername(targetValue);
    } else if (targetName === 'password') {
      setPassword(targetValue);
    } else if (targetName === "fullname") {
      setFullname(targetValue);
    }
  }

  const handleLoginSubmit = (e) => {
    console.log('new user created!')
    // add logic to limit characters to 16
    // add logic to check that the username doesn't already exist
      // conditionally renders red text saying username taken in the return
    // add to database

    axios.post('/api/signup', { username, password, fullname })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div>
        SIGN UP
      </div>
      <div>
        <div>
          <label>
            Your Full Name:
            <input
              type="text"
              name="fullname"
              value={fullname}
              onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Username - Limited to 16 char max:
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
        </div>
          <button
            type="button"
            onClick={handleLoginSubmit}>Sign Up</button>
      </div>
    </div>
  )
}

export default Signup;