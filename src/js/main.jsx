import React from 'react'
import ReactDOM from 'react-dom/client'


import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap"


import '../styles/index.css'


import Home from './components/Home';
import { AppProvider } from "./components/AppContexts";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <Home />
    </AppProvider>
  </React.StrictMode>
)
