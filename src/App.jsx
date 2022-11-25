import './assets/scss/app.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockOverviewPage from './pages/StockOverviewPage'
import StockDetailPage from './pages/StockDetailPage'
import { finnhubClient, FinnhubProvider } from 'react-finnhub'
import { AppContextProvider } from './context/appContext'

function App() {
  const client = finnhubClient( import.meta.env.VITE_FINNHUB_API_KEY )
  return (
      <main className="container mx-auto my-3">
        <FinnhubProvider client={ client }>
          <AppContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path={ '/' } element={ <StockOverviewPage/> }/>
                <Route path={ '/detail/:symbol' } element={ <StockDetailPage/> }/>
              </Routes>
            </BrowserRouter>
          </AppContextProvider>
        </FinnhubProvider>
      </main>
  )
}

export default App
