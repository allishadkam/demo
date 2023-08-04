import React, {useState,useEffect} from 'react'
const AuthContext=React.createContext({
    isLoggedIn: false,
    onLogout: ()=>{},
    onLogin: (email,password)=>{}
});

export const AuthContexProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const isuserlogedin = localStorage.getItem('islogedin')
    if(isuserlogedin === "1"){
      setIsLoggedIn(true)
    }
  },[]);


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


    return <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
    }}>{props.children}</AuthContext.Provider>
};
export default AuthContext;