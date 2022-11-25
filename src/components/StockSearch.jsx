import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/appContext'

const StockSearch = () => {
  const [ search, setSearch ] = useState( '' )
  const [ results, setResults ] = useState( [] )
  const { addSymbol, apiFetch } = useContext( AppContext )

  // Send search to FinnHub
  useEffect( () => {
    const controller = new AbortController()
    if ( search === '' ) {
      setResults( [] )
    } else {
      apiFetch( 'tickers', {
        signal: controller.signal,
        search: search,
        market: 'stocks',
        active: true,
      } )
          .then( response => {
            console.log( response?.data.results )
            setResults( response?.data.results )
          } )
    }

    return () => {
      controller.abort()
    }
  }, [ search ] )

  const renderDropdown = () => {
    return results.map( item => (
        <li className={ '' } key={ item.ticker } onClick={ () => {
          addSymbol( item.ticker )
          setSearch( '' )
        } }>
          <span>{ item.ticker }</span>
          <span>{ item.name }</span>
        </li> ) )
  }

  return (
      <>
        <div className="stocksearch w-50 p-5 rounded mx-auto">
          <div className="form-floating dropdown">
            <input
                type="text"
                name="search"
                id="search"
                className="form-control bg-light"
                placeholder="Search"
                autoComplete="off"
                onChange={ e => setTimeout( () => setSearch( e.target.value ), 1000 ) }
                onBlur={ () => setTimeout( () => setResults( [] ), 1000 ) }
            />
            <label htmlFor="search">Search for stock symbol</label>
            <div className={ `dropdown-menu ${ results?.length && 'show' }` }>
              <ul className={ 'm-0 p-0' }>
                { renderDropdown() }
              </ul>
            </div>
          </div>
        </div>
      </>
  )
}

export default StockSearch