import { useContext, useEffect, useState } from 'react'
import { useFinnhub } from 'react-finnhub'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { AiFillCloseCircle } from 'react-icons/ai'
import { AppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { GridLoader } from 'react-spinners'

/**
 * `StockList` component
 * @returns {JSX.Element}
 * @constructor
 */
const StockList = () => {
  const { watchList, deleteSymbol } = useContext( AppContext )
  const finnhub = useFinnhub()
  const [ symbols, setSymbols ] = useState( [] )
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState( true )

  // reload the watchlist every 5 minutes
  useEffect( () => {
    const interval = setInterval( () => {
      getSymbols()
    }, 5 * 60 * 1000 )

    return () => clearInterval( interval )
  }, [] )

  function getSymbols() {
    setLoading( true )
    const quotes = watchList.map( symbol => finnhub.quote( symbol ) )

    Promise.all( quotes ).then( results => {
      return results.map( ( r, i ) => {
        return {
          data: r.data,
          symbol: watchList[ i ], // promises return FIFO
        }
      } )
    } ).then( symbols => {
      setLoading( false )
      setSymbols( symbols )
    } ).catch( e => {
      console.log( e )
    } )
  }

  /**
   * Fetch stock data from Finnhub
   */
  useEffect( () => {
    getSymbols()
  }, [ watchList ] )

  /**
   * Get styles for price/percentage up or down
   * @param amount
   * @returns {{color: string, icon: JSX.Element|string}}
   */
  const getChangeStyle = amount => {
    const down = {
      color: 'text-danger',
      icon: <AiFillCaretDown/>,
    }

    const up = {
      color: 'text-success',
      icon: <AiFillCaretUp/>,
    }

    const unchanged = {
      color: '',
      icon: '',
    }

    if ( amount < 0 ) return down
    if ( amount > 0 ) return up
    else return unchanged
  }

  /**
   * Navigate to stock detail page
   * @param e
   * @param symbol
   */
  const handleSymbolSelect = ( e, symbol ) => {
    e.preventDefault()
    navigate( `/detail/${ symbol }` )
  }

  /**
   * Render stock list
   * @returns {unknown[]}
   */
  const renderTable = () => (
      symbols.map( item => (
          <tr key={ item.symbol }>
            <th scope="row">
              <a href="true"
                 className={ 'text-start detail-link' }
                 onClick={ ( e ) => handleSymbolSelect( e, item.symbol ) }>
                { item.symbol }
              </a>
            </th>
            <td>{ item.data.c }</td>
            <td className={ getChangeStyle( item.data.d ).color }>
              { item.data.d }
              { getChangeStyle( item.data.d ).icon }
            </td>
            <td className={ getChangeStyle( item.data.dp ).color }>
              { item.data.dp }
              { getChangeStyle( item.data.dp ).icon }
            </td>
            <td>{ item.data.h }</td>
            <td>{ item.data.l }</td>
            <td>{ item.data.o }</td>
            <td>{ item.data.pc }</td>
            <td className="delete-symbol">
              <button type="button" onClick={ () => deleteSymbol( item.symbol ) }>
                <AiFillCloseCircle/>
              </button>
            </td>
          </tr>
      ) )
  )

  if ( loading ) return <div className="d-grid justify-content-center">
    <GridLoader color="#ffffff"/>
  </div>

  return (
      <>
        <div className={ 'stocklist table-responsive' }>
          <table className={ 'table table-dark table-striped table-hover' }>
            <caption>Current Stock Stats</caption>
            <thead>
            <tr>
              <th scope={ 'col' } className={ 'text-start' }>Symbol</th>
              <th scope={ 'col' }>Current</th>
              <th scope={ 'col' }>Change</th>
              <th scope={ 'col' }>Change %</th>
              <th scope={ 'col' }>High</th>
              <th scope={ 'col' }>Low</th>
              <th scope={ 'col' }>Open</th>
              <th scope={ 'col' }>PClose</th>
              <th scope={ 'col' }>&nbsp;</th>
            </tr>
            </thead>
            <tbody className={ 'table-group-divider' }>
            { renderTable() }
            </tbody>
          </table>
        </div>
      </>
  )
}

export default StockList