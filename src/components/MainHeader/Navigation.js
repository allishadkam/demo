import React  from 'react';
import Authontext from '../../Store/auth-contex';

import classes from './Navigation.module.css';
import { useContext } from 'react';

const Navigation = () => {
  const ctx = useContext(Authontext)

  
  return (
        <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
    
    );
};

export default Navigation;
