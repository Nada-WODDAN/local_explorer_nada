import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import HomeCard from './components/Home/HomeCard.jsx';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeContextProvider } from "./assets/Theme";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ThemeContextProvider>
     <HomeCard />
    </ThemeContextProvider>
  
    

  </React.StrictMode>
);


reportWebVitals();
