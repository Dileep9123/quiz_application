import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router'
import AppRoutes from './config/AppRoutes.jsx'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Toaster />
     <UserProvider>
     <AppRoutes />
     </UserProvider>
  </BrowserRouter>
)
