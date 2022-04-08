import React, { useState } from 'react';
import './Input.css';


export default function Input({ setSymbol }) {
  const [inputValue, setInputValue] = useState();


  const handleClick = () => {
    setSymbol(inputValue);
    // inputValue === '' ? alert('Please enter a valid symbol') : setInputValue('');
  }

  return (
    <>
      <div id="inputs">
        <label>Enter Stock Ticker Symbol (e.g. MSFT):</label>
        <input type="text" placeholder="Search" onBlur={handleClick} onChange={e => setInputValue(e.target.value)} />
        <hr />
      </div>
    </>
  );
}
