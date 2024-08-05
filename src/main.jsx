import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GifProvider from './context/gif-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GifProvider>
    <App />
    </GifProvider>
  </React.StrictMode>,
)
