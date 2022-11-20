import { useEffect, useRef, useState } from 'react'
import { useFinnhub } from 'react-finnhub'

const StockList = () => {
  const isMounted = useRef( false )
  const finnhub = useFinnhub()
  const [ stocks, setStocks ] = useState( [] )
  const [ watchList, setWatchList ] = useState( [ 'GOOGL', 'MSFT', 'AMZN' ] )

  useEffect( () => {
    isMounted.current = true

    const quotes = watchList.map( stock => finnhub.quote( stock ) )

    isMounted.current && Promise.all( quotes ).then( results => {
      return results.map( ( r, i ) => {
        return {
          data: r.data,
          symbol: watchList[ i ], // promises return FIFO
        }
      } )
    } ).then( stocksObj => {
      setStocks( stocksObj )
    } )

    return () => {
      isMounted.current = false
    }
  }, [] )

  useEffect( () => {
      console.log(stocks)
  }, [stocks])

  return (
      <>
        <h2>StockList</h2>
        <p>{ JSON.stringify( stocks ) }</p>
      </>
  )
}

export default StockList