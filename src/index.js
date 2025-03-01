import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import "../node_modules/bootstrap/scss/bootstrap.scss";
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.css';
import { BrowserRouter } from 'react-router-dom';
import TireProvider from "./providers/TireProvider";
import App from './App';
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <TireProvider>
            <App />
          </TireProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

