import Chart from 'react-apexcharts'
import { useState } from 'react'

const StockChart = ( { chartData, symbol } ) => {
  const [ timeSeries, setTimeSeries ] = useState( 'year' )

  // set color to red if price is down, green if price is up, use bootstrap hex colors
  function getColor(){
    if ( chartData[ timeSeries ].length > 0 ) {
      const first = chartData[ timeSeries ][ 0 ].close
      const last = chartData[ timeSeries ][ chartData[ timeSeries ].length - 1 ].close
      if ( first > last ) {
        return [ '#dc3545' ]
      } else {
        return [ '#28a745' ]
      }
    }
  }

  // if i invested $4000 in the stock on the first day, how much would it be worth today?
  function getInvestmentChange(withCurrency  = false){
    if ( chartData[ timeSeries ].length > 0 ) {
      const first = chartData[ timeSeries ][ 0 ].close
      const last = chartData[ timeSeries ][ chartData[ timeSeries ].length - 1 ].close
      const investment = 4000
      return (withCurrency ? '$' : '') + ( last * investment / first ).toFixed( 2 )
    }
  }

  // get the percentage change in price from the first day to the last day
  function getPercentChange(withPercent = false){
    if ( chartData[ timeSeries ].length > 0 ) {
      const first = chartData[ timeSeries ][ 0 ].close
      const last = chartData[ timeSeries ][ chartData[ timeSeries ].length - 1 ].close
      return (( last - first ) / first * 100 ).toFixed( 2 ) + ( withPercent ? '%' : '' )
    }
  }

  function getTimeSeriesData() {
    // console.log( 'timeSeries', chartData[ timeSeries ] )
    if ( chartData[ timeSeries ].length > 0 ) {
      return chartData[ timeSeries ].map( d => ( {
        x: d.time,
        y: d.close,
      } ) )
    }
  }

  const chart = {
    options: {
      colors: getColor(),
      chart: {
        id: 'stock-chart'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          datetimeUTC: false,
        },
      },
      yaxis: {
        decimalsInFloat: 2,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy',
        },
      },
      dataLabels: {
        formatter: function ( val ) {
          return val.toFixed( 2 )
        }
      }
    },
    series: [
      {
        // data is an array of objects with x and y properties
        data: getTimeSeriesData(),
        name: symbol,
      } ],
  }

  // give me a function which returns a button for each time series, formatted for active time series
  const renderTimeSeriesButtons = () => {
    // map the keys of chartData to 24h, 1w, 1y
    const timeSeriesKeys = Object.keys( chartData )
    const timeSeriesLabels = {
      day: '24h',
      week: '1w',
      year: '1y',
    }

    return timeSeriesKeys.map( ts => (
        <button
            key={ ts }
            className={ `btn btn-sm btn-outline-dark ${ ts === timeSeries && 'active' }` }
            onClick={ () => setTimeSeries( ts ) }
        >
          { timeSeriesLabels[ ts ] }
        </button> ) )
  }

  return (
      <>
        <div className="d-flex justify-content-center gap-1">
          <span className={ `text-center fw-bold ${ getInvestmentChange() < 0 && 'text-danger' }` }>
            { getInvestmentChange(true) }
          </span>
          <span className={ `text-center fw-bold ${ getPercentChange() < 0 && 'text-danger' }` }>
            { getPercentChange(true) }
          </span>
        </div>
        <Chart options={ chart.options } series={ chart.series } type={ 'area' } height="300px"/>
        <div className={ 'd-flex flex-row gap-1 justify-content-center mb-3' }>
          { renderTimeSeriesButtons() }
        </div>
      </>
  )
}

export default StockChart