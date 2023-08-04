import React, { useEffect, useState } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Authontext from './Store/auth-contex';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const isuserlogedin = localStorage.getItem('islogedin')
    if(isuserlogedin === "1"){
      setIsLoggedIn(true)
    }
  },[]);

  
  //alert('')

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("islogedin","1")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("islogedin")
    setIsLoggedIn(false);
  };

  return (
    <Authontext.Provider value={{
      isLoggedIn: isLoggedIn,
      onLogout :logoutHandler
  }}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </Authontext.Provider>
  );
}

export default App;
