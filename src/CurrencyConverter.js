import { useCallback, useEffect, useState } from "react";
import CurrencyDropdown from "./CurrencyDropdown";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  const fetchcurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("error fetching", error);
    }
  };

  const convertCurrency = useCallback(async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();

      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("error fetching", error);
    } finally {
      setConverting(false);
    }
  }, [amount, fromCurrency, toCurrency]);

  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

  useEffect(() => {
    fetchcurrencies();
  }, []);

  console.log(currencies);

  return (
    <div className="App">
      <h2 className="">currency converter</h2>

      <div>
        <CurrencyDropdown
          currencies={currencies}
          currnency={fromCurrency}
          setCurrency={setFromCurrency}
          title="From"
        />
      </div>
      <div>
        <CurrencyDropdown
          currencies={currencies}
          currnency={toCurrency}
          setCurrency={setToCurrency}
          title="To"
        />
      </div>

      <div className="">
        <label>Amount : </label>
      </div>
      <div className="">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="enter number"
        />
      </div>
      <div className="">
        <button
          onClick={convertCurrency}
          className={`${converting ? "animate-pluse" : ""}`}
        >
          Convert
        </button>
      </div>
      {convertedAmount && <div>converted Amount: {convertedAmount}</div>}
    </div>
  );
};

export default CurrencyConverter;

//https://api.frankfurter.app/currencies

//https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`

//https://www.youtube.com/watch?v=Y1Q4XXXmVk4
