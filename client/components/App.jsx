import React, { useState, useEffect } from 'react';
import { Login } from './Login';
import Signup from './Signup';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 97vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #4A4E69;
    font-family: "Helvetica Neue", sans-serif;
  }
`
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 280px;
  max-width: 80%;
  min-width: 100px;
  min-height: 400px;
  padding: 20px 40px;
  border-radius: 6px;
  box-shadow: 0px 8px 36px #222;
  background-color: #fefefe;
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
const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const handleSwitchClick = () => {
    setIsLogin(!isLogin);
    setIsSignup(!isSignup);
  }

  return (
    <div>
      <GlobalStyle />
      <FormWrapper>
        {isLogin && (
          <>
            <Login handleSwitchClick={handleSwitchClick} />
            {/* <HelpText onClick={handleSwitchClick}>Don't have an account? Sign Up Here</HelpText> */}
          </>
        )}
        {isSignup && (
          <>
            <Signup />
            <HelpText onClick={handleSwitchClick}>Already have an account? Login Here</HelpText>
          </>
        )}
      </FormWrapper>
    </div>
  )
}

export default App;