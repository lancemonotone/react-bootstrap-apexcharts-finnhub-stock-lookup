import { useContext, useEffect, useState } from 'react'
import { useFinnhub } from 'react-finnhub'
import { WatchListContext } from '../context/watchListContext'

const Autocomplete = () => {
  const finnhub = useFinnhub()
  const [ search, setSearch ] = useState( '' )
  const [ results, setResults ] = useState( [] )
  const { addSymbol } = useContext( WatchListContext )

  // Send search to FinnHub
  useEffect( () => {
    if ( search === '' ) {
      setResults( [] )
    } else {
      finnhub.symbolSearch( search )
          .then( response => {
            const filteredResults = response.data.result.filter( r => (
                // Only include major results
                !r.symbol.includes( '.' ) &&
                !r.symbol.includes( ':' )
            ) )
            setResults( filteredResults )
          } ).catch( e => {
        console.log( e )
      } )
    }
  }, [ search ] )

  // useEffect( () => {
  //   console.log( 'results', results )
  // }, [ results ] )

  const renderDropdown = () => {
    return results.map( item => (
        <li className={ '' } key={ item.symbol } onClick={ () => {
          addSymbol( item.symbol )
          setSearch( '' )
        } }>
          <span>{ item.symbol }</span>
          <span>{ item.description }</span>
        </li> ) )
  }

  return (
      <>
        <div className="autocomplete w-50 p-5 rounded mx-auto">
          <div className="form-floating dropdown">
            <input
                type="text"
                name="search"
                id="search"
                className="form-control bg-light"
                placeholder="Search"
                autoComplete="off"
                onChange={ e => setTimeout( () => setSearch( e.target.value ), 200 ) }
                onBlur={ () => setTimeout( () => setResults( [] ), 200 ) }
            />
            <label htmlFor="search">Search for stock symbol</label>
            <div className={ `dropdown-menu ${ results.length && 'show' }` }>
              <ul className={ 'm-0 p-0' }>
                { renderDropdown() }
              </ul>
            </div>
          </div>
        </div>
      </>
  )
}

export default Autocomplete