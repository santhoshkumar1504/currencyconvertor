import { useEffect, useState } from 'react';
 import axios from 'axios';
import './App.css'
import image from './assets/currency-convertor.png';
function App() {

  const [amount,setAmount]=useState(1);
  const [fromcurrency,setFromcurrency] =useState("USD");
  const [tocurrency,setTocurrency] =useState("INR");
  const [converted,setConverted] =useState(null);
  const [exchangeRate,setExchangeRate]=useState(null);

  const [currencies,setCurrencies]=useState([]);
 

  useEffect(()=>{
    const getExchangeRate=async()=>{
      try{
      let url=`https://v6.exchangerate-api.com/v6/5fe5dd652295d5e2d8f7c46a/latest/${fromcurrency}`;
      const response=await axios.get(url);
        // console.log(response);
        setExchangeRate(response.data.conversion_rates[tocurrency]);

     const cur=Object.entries(response.data.conversion_rates);
        // console.log(cur);
        setCurrencies(cur);

      }
      catch(error)
      {
        console.error("Error fetching exchange Rate: ",error);
        
      }
    };
    getExchangeRate();
  },[fromcurrency,tocurrency]);

  useEffect(()=>{
   if(exchangeRate!==null)
   {
    setConverted((amount*exchangeRate).toFixed(2));
   }
  },[amount,exchangeRate]);

  const handleAmount=(e)=>{
    const value=parseFloat(e.target.value);
    setAmount(isNaN(value)?0:value);
  }
  const handleFromCurrencyChange=(e)=>{
    setFromcurrency(e.target.value);
  }
  const handleToCurrencyChange=(e)=>{
    setTocurrency(e.target.value);
  }




  return (
    <>
      <div className='container'>
        <div className="inner">
          <img src={image} alt="image"/>
          <div className='title'>
            CURRENCY CONVERTER
          </div>

          <div className='forms'>
          <label htmlFor="amount">Amount :</label>
          <input type="number" name="amount" id="amount" value={amount} onChange={handleAmount}/>

          <label htmlFor="from">From : Currency</label>
          <select name="from" id="from" value={fromcurrency} onChange={handleFromCurrencyChange}>
            {currencies.map((item)=>( <option value={item[0]}>{item[0]}</option>))}
          </select>

          <label htmlFor="to">To : Currency</label>
          <select name="to" id="to" value={tocurrency} onChange={handleToCurrencyChange}>
                       {currencies.map((item)=>( <option value={item[0]}>{item[0]}</option>))}
          </select>
          </div>


          <div className='result'>
            <h3>{amount} {fromcurrency} is equal to {converted} {tocurrency}</h3>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
