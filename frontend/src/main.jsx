import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ToastContainer } from 'react-toastify';

import App from './App.jsx'

// Styles
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-left" autoClose={3000} theme='colored' toastClassName={"toast"} />
  </StrictMode>,
)
