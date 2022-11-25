import StockSearch from '../components/StockSearch'
import StockList from '../components/StockList'
import DarkModeToggle from '../components/DarkModeToggle'

const StockOverviewPage = () => {
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className='text-center'>Search Stocks</h1>
        <DarkModeToggle />
      </div>
      <StockSearch />
      <StockList />
    </>
  )
}

export default StockOverviewPage