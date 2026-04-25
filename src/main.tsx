import React from 'react';
import ReactDOM from 'react-dom/client';
import { InterwovenKitProvider, TESTNET } from '@initia/interwovenkit-react';
import { App } from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <InterwovenKitProvider {...TESTNET}>
      <App />
    </InterwovenKitProvider>
  </React.StrictMode>
);
