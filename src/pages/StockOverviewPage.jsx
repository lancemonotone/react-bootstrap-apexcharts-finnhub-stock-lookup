import StockSearch from '../components/StockSearch'
import StockList from '../components/StockList'

const StockOverviewPage = () => {
  return (
      <>
        <h1 className='text-center'>Search Stocks</h1>
        <StockSearch/>
        <StockList/>
      </>
  )
}

export default StockOverviewPage