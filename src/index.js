import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthContexProvider } from './Store/auth-contex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthContexProvider><App /></AuthContexProvider>);
