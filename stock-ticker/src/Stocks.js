import React, { useState, useEffect } from 'react';
import './Stocks.css';

export default function Stocks({ stockInput }) {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        //const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockInput}&token=sandbox_c7o5ruaad3idf06mnlqg`)
        const response = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${stockInput}&token=c7o5ruaad3idf06mnlq0`);
        if (!response.ok) {
          throw new Error(`${response.statusText}`)
        }
        const data = await response.json()
        setStocks(data)
        console.log(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false);
      }
    })();
  }, [stockInput]);

  if (loading) {
    return <h2 id="loading">Loading...</h2>;
  }

  return (
    <>
      <h1 id="stockName">{stocks.ticker} - {stocks.name}</h1>
      <p id="stockBody">{stocks.finnhubIndustry}</p>
      <p id="stockBody">{stocks.exchange}</p>
      {/* <p id="stockBody">{stocks.description}</p> */}
    </>

  );
}
