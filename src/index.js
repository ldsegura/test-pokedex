import React from 'react';
import App from './App';
import StoreProvider from './store/StoreProvider';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
//import { HelmetProvider } from 'react-helmet-async';

const container = document.getElementById('root');
const root = createRoot(container);
//const helmetContext = {};

root.render(
  // <HelmetProvider context={helmetContext}>
    <StoreProvider>
      <BrowserRouter>
        <App ssrRoutesData={window.__data__}/>
      </BrowserRouter>
    </StoreProvider>
  // </HelmetProvider>
);