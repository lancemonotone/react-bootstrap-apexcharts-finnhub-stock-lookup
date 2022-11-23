import './assets/scss/app.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StockOverviewPage from './pages/StockOverviewPage'
import StockDetailPage from './pages/StockDetailPage'
import { finnhubClient, FinnhubProvider } from 'react-finnhub'
import { WatchListContextProvider } from './context/watchListContext'

function App() {
  const client = finnhubClient( import.meta.env.VITE_FINNHUB_API_KEY )
  return (
      <main className="container">
        <FinnhubProvider client={ client }>
          <WatchListContextProvider>
            <BrowserRouter>
              <Routes>
                <Route path={ '/' } element={ <StockOverviewPage/> }/>
                <Route path={ '/detail/:symbol' } element={ <StockDetailPage/> }/>
              </Routes>
            </BrowserRouter>
          </WatchListContextProvider>
        </FinnhubProvider>
      </main>
  )
}

export default App
