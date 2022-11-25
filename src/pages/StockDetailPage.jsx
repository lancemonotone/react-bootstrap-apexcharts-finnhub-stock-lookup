import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFinnhub } from 'react-finnhub'
import StockChart from '../components/StockChart'
import StockData from '../components/StockData'

const StockDetailPage = () => {
  const { symbol } = useParams()
  const finnhub = useFinnhub()
  const [ chartData, setChartData ] = useState( undefined )
  // const [ loading, setLoading ] = useState( true )

  // get number of seconds in one day
  let oneDayInSeconds = 60 * 60 * 24

  // get current time in seconds
  let now = Math.floor( Date.now() / 1000 )

  let lastWorkday = getLastWorkday( now, oneDayInSeconds )

  // get one week ago in seconds
  let oneWeekAgo = now - 604800

  // get one year ago in seconds
  let oneYearAgo = now - 31536000

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
    } ]

  function formatChartData( data ) {
    if ( data.s === 'no_data' ) {
      return []
    }

    return data.t.map( ( t, i ) => ( {
      time: t * 1000,
      open: data.o[ i ],
      high: data.h[ i ],
      low: data.l[ i ],
      close: data.c[ i ],
      volume: data.v[ i ],
    } ) )
  }

  useEffect( () => {
    // setLoading( true )

    const results = Promise.all( chartResolutions.map( r => {
      return finnhub.stockCandles( symbol, r.resolution, r.from, now )
    } ) )

    results.then( responses => {
          console.log( 'responses', responses )

          return {
            year: formatChartData( responses[ 2 ].data ),
            week: formatChartData( responses[ 1 ].data ),
            day: formatChartData( responses[ 0 ].data ),
          }
        } )
        .then( data => setChartData( data ) )
        .catch( e => console.log( e ) )
  }, [] )

  return (
      <>
        <div className="d-flex justify-content-center position-relative">
          <h2 className="text-center fw-bold">{ symbol }</h2>
          <button className="btn btn-sm btn-outline-dark position-absolute end-0 top-50" onClick={ () => window.history.back() }>Back</button>
        </div>
        { chartData && <StockChart chartData={ chartData } symbol={ symbol }/> }
        { chartData && <StockData symbol={ symbol }/> }
      </>
  )
}

export default StockDetailPage