import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  Title,
  Label,
  Input,
  Button,
  ErrorMsg
} from './Login';

// future:
// add email registration field and check to make sure they don't already have a user at that same email to prevent creating multiple accounts per email, which is preferred in many cases
// add 2nd password field to confirm that the two match when signing up
// add logic to handle username already existing

const UserCreatedMsg = styled.div`
  margin-top: 20px;
  font-size: 2em;
  text-align: center;
`

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

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
    if (!username || !password || !fullname) {
      setError(true);
      return;
    } else {
      setError(false);
      setUserCreated(true);
    }

    axios.post('/api/signup', { username, password, fullname })
      .then(({ data }) => console.log(data))
      .then(() => {setUserCreated(true)})
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Title>
        SIGN UP
      </Title>
      {!userCreated ? (
        <div>
          <div>
            <Label>
              Your Full Name:
              <Input
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleChange} />
            </Label>
          </div>
          <div>
            <Label>
              Username:
              <Input
                type="text"
                name="username"
                value={username}
                onChange={handleChange} />
            </Label>
          </div>
          <div>
            <Label>
              Password:
              <Input
                type="password"
                name="password"
                value={password}
                onChange={handleChange} />
            </Label>
          </div>
          <Button
            type="button"
            onClick={handleLoginSubmit}>Sign Up</Button>
        </div>
      ) : (
        <UserCreatedMsg>
          User Created!
        </UserCreatedMsg>
      )}
      {error && (
        <ErrorMsg>
          Please fill in all fields!
        </ErrorMsg>
      )}
    </div>
  )
}

export default Signup;