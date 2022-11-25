import { createContext, useEffect, useState } from 'react'
import polygon from '../api/apiPolygon'

const AppContext = createContext( {} )

const AppContextProvider = ( { children } ) => {
  // API
  const apiFetch = async ( endpoint, params ) => {
    return await polygon.get( endpoint, {
      params: params,
    } ).then( response => {
      return response
    } ).catch( e => {
      console.log( e )
    } )
  }

  // Watchlist
  const key = 'com.lancemonotone.stocks.watchlist'
  const localWatchList = JSON.parse( localStorage.getItem( key ) )
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
    localStorage.setItem( key, JSON.stringify( watchList ) )
  }, [ watchList ] )

  return (
      <AppContext.Provider value={ {
        watchList,
        addSymbol,
        deleteSymbol,
        apiFetch,
      } }>
        { children }
      </AppContext.Provider>
  )
}

export { AppContext, AppContextProvider }
