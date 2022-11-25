import { useEffect, useState } from 'react'
import { useFinnhub } from 'react-finnhub'

const StockData = ( { symbol } ) => {
  const finnhub = useFinnhub()
  const [ data, setData ] = useState( {} )

  /**
   * Fetch stock data from Finnhub
   */
  useEffect( () => {
    finnhub.companyProfile2( symbol ).then( results => {
      setData( results.data )
    } ).catch( e => {
      console.log( e )
    } )
  }, [] )

  return (
      <>
        <div className="mx-auto w-75 small">
          <div className="card">
            <div className="card-header">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="card-title">{ data.name }</h5>
                </div>
                <div className="col  text-end">
                  <img src={ data.logo } alt={ data.name }/>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row lh-1">
                <div className="col">
                  <p className="card-text">Ticker: { data.ticker }</p>
                  <p className="card-text">Market Cap: { data.marketCapitalization }</p>
                  <p className="card-text">Country: { data.country }</p>
                  <p className="card-text">Currency: { data.currency }</p>
                  <p className="card-text">Exchange: { data.exchange }</p>
                </div>
                <div className="col">
                  <p className="card-text">Industry: { data.finnhubIndustry }</p>
                  <p className="card-text">IPO: { data.ipo }</p>
                  <p className="card-text">Phone: { data.phone }</p>
                  <p className="card-text">Share Outstandings: { data.shareOutstanding }</p>
                  <p className="card-text">Weburl: <a href={ data.weburl }>{ data.weburl }</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default StockData