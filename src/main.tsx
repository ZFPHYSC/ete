import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { UploadProvider } from './contexts/UploadContext'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <UploadProvider>
        <App />
      </UploadProvider>
    </HashRouter>
  </React.StrictMode>
);
