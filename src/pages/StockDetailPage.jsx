import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFinnhub } from 'react-finnhub'

const StockDetailPage = () => {
  const { symbol } = useParams()
  let finnhub = useFinnhub()
  const [ chartData, setChartData ] = useState( {} )

  function formatChartData( group ) {
    return group.t.map( ( t, i ) => ( {
      time: t * 1000,
      open: group.o[ i ],
      high: group.h[ i ],
      low: group.l[ i ],
      close: group.c[ i ],
      volume: group.v[ i ],
    } ) )
  }

  function getLastWorkday( now, oneDayInSeconds ) {
    if ( new Date().getDay() === 1 ) {
      // if today is Monday, get Friday's date
      return now - ( oneDayInSeconds * 4 )
    } else if ( new Date().getDay() === 0 ) {
      // if today is Sunday, get Friday's date
      return now - ( oneDayInSeconds * 3 )
    } else if ( new Date().getDay() === 6 ) {
      // if today is Saturday, get Friday's date
      return now - ( oneDayInSeconds * 2 )
    } else {
      // if today is Tuesday-Friday, get yesterday's date
      return now - oneDayInSeconds
    }
  }

  useEffect( () => {
    // get number of seconds in one day
    let oneDayInSeconds = 60 * 60 * 24

    // get current time in seconds
    let now = Math.floor( Date.now() / 1000 )

    let lastWorkday = getLastWorkday( now, oneDayInSeconds )

    // get one week ago in seconds
    let oneWeekAgo = now - 604800

    // get one year ago in seconds
    let oneYearAgo = now - 31536000

    const chartResolutions = [
      {
        from: lastWorkday,
        resolution: 60,
      }, {
        from: oneWeekAgo,
        resolution: 'D',
      }, {
        from: oneYearAgo,
        resolution: 'W',
      } ].map( r => {
      return finnhub.stockCandles( symbol, r.resolution, r.from, now )
    } )

    Promise.all( chartResolutions )
        .then( responses => {
          console.log( 'responses', responses )
          const data = {
            day: formatChartData( responses[ 0 ].data ),
            week: formatChartData( responses[ 1 ].data ),
            year: formatChartData( responses[ 2 ].data ),
          }
          console.log( 'formattedChartData', data )
          setChartData( data )
        } )
        .catch( e => console.log( e ) )
  }, [] )

  return (
      <>
        <h1>Stock Detail Page</h1>
        <p>{ symbol }</p>
      </>
  )
}

export default StockDetailPage