import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router'
import { AuthProvider } from './Components/Authcontex'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
  </React.StrictMode>,
)
