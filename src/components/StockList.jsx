import { useState } from 'react'
const finnhub = require('finnhub')

const StockList = () => {
  const [watchList, setWatchList] = useState(['FTGX','MSFT','GOOGL'])

  return (
      <>
        <p>StockList</p>
      </>
  )
}

export default StockList