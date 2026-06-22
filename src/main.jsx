import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { UserProvider } from './context/UserContext'
if (import.meta.env.DEV) {
  import("eruda").then((eruda) => {
    eruda.default.init();
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
)
