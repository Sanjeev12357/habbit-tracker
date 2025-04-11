import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Set dark mode as default
if (!localStorage.getItem('darkMode')) {
  document.documentElement.classList.add('dark');
  localStorage.setItem('darkMode', JSON.stringify(true));
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
