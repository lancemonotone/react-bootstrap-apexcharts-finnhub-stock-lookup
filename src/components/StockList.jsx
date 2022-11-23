import { useContext, useEffect, useState } from 'react'
import { useFinnhub } from 'react-finnhub'
import { AiFillCaretDown, AiFillCaretUp, AiFillDelete } from 'react-icons/ai'
import { WatchListContext } from '../context/watchListContext'
import { useNavigate } from 'react-router-dom'

const StockList = () => {
  const { watchList, deleteSymbol } = useContext( WatchListContext )
  const finnhub = useFinnhub()
  const [ symbols, setSymbols ] = useState( [] )
  const navigate = useNavigate()

  /**
   * Fetch stock data from Finnhub
   */
  useEffect( () => {
    const quotes = watchList.map( symbol => finnhub.quote( symbol ) )

    Promise.all( quotes ).then( results => {
      return results.map( ( r, i ) => {
        return {
          data: r.data,
          symbol: watchList[ i ], // promises return FIFO
        }
      } )
    } ).then( symbols => {
      setSymbols( symbols )
    } ).catch( e => {
      console.log( e )
    } )
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
   * @param symbol
   */
  const handleSymbolSelect = symbol => {
    navigate( `/detail/${ symbol }` )
  }

  /**
   * Render stock list
   * @returns {unknown[]}
   */
  const renderTable = () => (
      symbols.map( item => (
          <tr key={ item.symbol }>
            <th scope="row"
                className={ 'text-start detail-link' }
                onClick={ () => handleSymbolSelect( item.symbol ) }
            >
              { item.symbol }
            </th>
            <td className={ 'delete-symbol' }
                onClick={ () => deleteSymbol( item.symbol ) }>
              <AiFillDelete/>
            </td>
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
          </tr>
      ) )
  )

  return (
      <>
        <h2>StockList</h2>
        <div className={ 'stocklist table-responsive' }>
          <table className={ 'table table-dark table-striped table-hover mt-5' }>
            <caption>Current Stock Stats</caption>
            <thead>
            <tr>
              <th scope={ 'col' } className={ 'text-start' }>Symbol</th>
              <th scope={ 'col' }>&nbsp;</th>
              <th scope={ 'col' }>Current</th>
              <th scope={ 'col' }>Change</th>
              <th scope={ 'col' }>Change %</th>
              <th scope={ 'col' }>High</th>
              <th scope={ 'col' }>Low</th>
              <th scope={ 'col' }>Open</th>
              <th scope={ 'col' }>PClose</th>
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