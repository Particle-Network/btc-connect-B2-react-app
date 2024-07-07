import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ConnectProvider,
  OKXConnector,
  UnisatConnector,
  BitgetConnector
} from '@particle-network/btc-connectkit';
import { BSquaredTestnet, BSquared } from '@particle-network/chains';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <ConnectProvider
      options={{
        projectId: process.env.REACT_APP_PROJECT_ID,
        clientKey: process.env.REACT_APP_CLIENT_KEY,
        appId: process.env.REACT_APP_APP_ID,
        aaOptions: {
          accountContracts: {
            BTC: [
              {
                chainIds: [BSquaredTestnet.id, BSquared.id],
                version: '2.0.0',
              }
            ]
          }
        },
        walletOptions: {
          visible: true
        }
      }}
      connectors={[new UnisatConnector(), new OKXConnector(), new BitgetConnector()]}
    >
    <App />
    </ConnectProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
