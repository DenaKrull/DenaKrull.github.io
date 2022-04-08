import Header from './Header';
import Stocks from './Stocks';
import React, { useState } from 'react';
import Input from './Input';
import Quote from './Quote';



export default function App() {
  const [symbol, setSymbol] = useState();
  return (

    <>
      <Header />
      <Input setSymbol={setSymbol} />
      {symbol && <Stocks stockInput={symbol} />}
      {symbol && < Quote stockInput={symbol} />}
    </>);
}


