import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Title = styled.h4`
  display: flex;
  justify-content: center;
  font-size: 2em;
  font-weight: lighter;
  margin-top: 0.25em;
  color: #222;
`
const Label = styled.label`
  margin-bottom: 0.5em;
  color: #444;
  font-weight: lighter;
`
const Input = styled.input`
  width: 90%;
  padding: 10px 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid #d6d1d5;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  margin-top: 15px;
`
const Button = styled.button`
  width: 98%;
  padding: 10px 10px;
  margin-top: 40px;
  border-radius: 5px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  background-color: #4A4E69;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #f5a742;
    color: white;
    border-color: #4A4E69;
  }
`
const Welcome = styled.div`
  margin-top: 20px;
  font-size: 2em;
  text-align: center;
`
const ErrorMsg = styled.div`
  margin-top: 10px;
  color: red;
  font-size: 0.8em;
  text-align: center;
`
const HelpText = styled.div`
  cursor: pointer;
  margin-top: 20px;
  font-size: 0.8em;
  text-align: center;
  &:hover {
    color: #f5a742;
  }
`

const Login = ({ handleSwitchClick }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const checkAuth = () => {
    axios.get('/api/checkauth')
      .then(({ data }) => {
        if (data.authStatus === 'Authenticated') {
          setAuthenticated(true);
          setUsername(data.user.username)
        }
      })
      .catch((err) => console.log(err))
  }

  useEffect(checkAuth, []);

  const handleChange = (e) => {
    if (e.target.name === 'username') {
      setUsername(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  }

  const handleLoginSubmit = (e) => {
    axios.post('/api/login', { username, password })
      .then(({ data }) => {
        if (data === "Authenticated") {
          setAuthenticated(true);
          setAuthError(false);
        } else {
          setAuthError(true);
        }
        setPassword('');
      })
      .catch((err) => console.log(err));
  }

  const handleLogout = (e) => {
    axios.get('/api/logout')
      .then(() => setAuthenticated(false))
      .catch((err) => console.log(err))
  }

  return (
    <div>
      {!authenticated ? (
        <div>
          <Title>
            LOGIN
          </Title>
          <div>
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
                onClick={handleLoginSubmit}>Login</Button>
          </div>
          <HelpText onClick={handleSwitchClick}>
            Don't have an account? Sign Up Here
          </HelpText>
        </div>
      ) : (
        <div>
          <Welcome>
            Welcome {username}!
          </Welcome>
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>
      )}
      {authError && (
        <ErrorMsg>
          Username or password is incorrect!
        </ErrorMsg>
      )}

    </div>
  )
}

export {
  Login,
  Title,
  Label,
  Input,
  Button,
  ErrorMsg
};