import React, { useState, useEffect } from "react";

export default function CurrencySpliter() {
  const [currency, setCurrency] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [isloading, setIsloading] = useState(false);
  useEffect(
    function () {
      async function getCurrency() {
        setIsloading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${currency}&from=${from}&to=${to}`
        );
        const data = await res.json();
        console.log(data);

        setConvertedAmount(data.rates[to]);
        setIsloading(false);
      }

      if (from === to) return setConvertedAmount(currency);
      getCurrency();
    },
    [currency, to, from]
  );

  return (
    <div>
      <div>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(Number(e.target.value))}
        />
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        {isloading ? (
          <p>Loading...</p>
        ) : currency <= 0 ? (
          <p style={{ color: "red" }}>Please enter an amount greater than 0</p>
        ) : (
          <p>
            {to} {convertedAmount}
          </p>
        )}
      </div>
    </div>
  );
}
