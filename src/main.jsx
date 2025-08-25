import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createGlobalStyle } from "styled-components";
const Styledapp = createGlobalStyle`
  body {
    font-family: 'Sansation', sans-serif;
  }
  `;
createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <App />
      <Styledapp/>
  </StrictMode>,
)
