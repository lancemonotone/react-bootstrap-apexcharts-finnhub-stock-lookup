import { createContext, useEffect, useState } from 'react'

const WatchListContext = createContext( {} )

const WatchListContextProvider = ( { children } ) => {
  const localWatchList = JSON.parse( localStorage.getItem( 'com.lancemonotone.stocks.watchlist' ) )
  const defaultWatchList = [ 'GM', 'MSFT', 'AMZN', 'TSLA' ]
  const [ watchList, setWatchList ] = useState( localWatchList || defaultWatchList )

  const addSymbol = stock => {
    if ( !watchList.includes( stock ) ) {
      setWatchList( [ ...watchList, stock ] )
    }
  }

  const deleteSymbol = stock => {
    setWatchList( watchList.filter( s => s !== stock ) )
  }

  useEffect( () => {
    localStorage.setItem( 'com.lancemonotone.stocks.watchlist', JSON.stringify( watchList ) )
  }, [ watchList ] )

  return (
      <WatchListContext.Provider value={ {
        watchList,
        addSymbol,
        deleteSymbol,
      } }>
        { children }
      </WatchListContext.Provider>
  )
}

export { WatchListContext, WatchListContextProvider }
