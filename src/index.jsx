import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './assets/scss/app.scss'
import { finnhubClient, FinnhubProvider } from 'react-finnhub'

const client = finnhubClient( import.meta.env.VITE_FINNHUB_API_KEY )

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
    <React.StrictMode>
      <FinnhubProvider client={ client }>
        <App/>
      </FinnhubProvider>
    </React.StrictMode>,
)
