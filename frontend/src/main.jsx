import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie'
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UserContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
    <UserProvider>
      <App />
    </UserProvider>
    </CookiesProvider>
    </BrowserRouter>
  </StrictMode>,
)
