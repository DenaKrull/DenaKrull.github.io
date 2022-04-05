import React, { useEffect, useState } from 'react';
import './Quote.css';

export default function Quote({ stockInput }) {
  const [quote, setQuote] = useState([]);

  useEffect(() => {
    (async () => {

      try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stockInput}&token=sandbox_c7o5ruaad3idf06mnlqg`);
        if (!response.ok) {
          throw new Error(`${response.statusText}`)
        }
        const data = await response.json()
        setQuote(data)
        console.log(data)
      } catch (e) {
        console.error(e)
      }
    })();
  }, [stockInput]);


  return (
    <>
      <div id="quote">
        <h1>Current Price: {quote.c}</h1>
        <span>Change:</span>
        <div style={quote.d < 0 ? { color: 'red' } : { color: 'green' }}>{quote.d}</div>
      </div>
    </>
  );
}
