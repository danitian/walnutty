import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);

  const handleSwitchClick = () => {
    setIsLogin(!isLogin);
    setIsSignup(!isSignup);
  }

  return (
    <div>
      Welcome to Walnutty!
      {isLogin && (
        <div>
          <Login />
          <div onClick={handleSwitchClick}>Don't have an account? Sign Up Here</div>
        </div>
      )}
      {isSignup && (
        <div>
          <Signup />
          <div onClick={handleSwitchClick}>Already have an account? Login Here</div>
        </div>
      )}
    </div>
  )
}

export default App;