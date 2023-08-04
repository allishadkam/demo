import React, { useEffect, useState , useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-contex';

const emailReducer=(state,action)=>{

  const authCtx = useContext(AuthContext)


  if(action.type==="USER_INPUT"){
    return {value:action.val, isValid:action.val.includes("@")}
  }
  if(action.type==="INPUT_BLUR"){
    return {value:state.value, isValid:state.value.includes("@")}
  }
  return ({value:'', isValid:false})
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
 // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [EmailState,DispatchEmail]=useReducer(emailReducer,{value:'', isValid:null})

  useEffect(()=>{
    const identifier = setTimeout(()=>{
      console.log("checking validity of form")
      setFormIsValid(
      EmailState.isValid && enteredPassword.trim().length > 6
    )}
      ,500)
      return ()=>{
        console.log('clean up')
        clearTimeout(identifier)
      }
    
  },[EmailState,enteredPassword]);

  const emailChangeHandler = (event) => {
    DispatchEmail({type:"USER_INPUT",val:event.target.value})
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    DispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(EmailState, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            EmailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={EmailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
