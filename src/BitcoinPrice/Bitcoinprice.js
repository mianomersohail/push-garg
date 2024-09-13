import './BitcoinPrice.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './BitcoinPrice.css';
const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'; // Replace with your API URL

export default function AssetPrices() {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState('');

  const fetchPrices = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`${API_URL}/price`, { params: { currency: 'bitcoin', vs_currency: 'usd' } }),
        axios.get(`${API_URL}/price`, { params: { currency: 'gold', vs_currency: 'usd' } }),
        axios.get(`${API_URL}/price`, { params: { currency: 'oil', vs_currency: 'usd' } })
      ]);

      setPrices({
        bitcoin: responses[0].data.bitcoin?.usd || 'Data missing',
        gold: responses[1].data.gold?.usd || 'Data missing',
        oil: responses[2].data.oil?.usd || 'Data missing'
      });
    } catch (error) {
      setError('Failed to fetch prices.');
      console.error('Error fetching prices:', error);
    }
  };

  useEffect(() => {
    fetchPrices(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchPrices();
    }, 60000); // Fetch data every 60 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <div className="container main-price-co">
      <div className="scrolling-container">
        <div className="prices-box">
          <div className="price-item">
            <img className="price-icon" src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png" alt="Bitcoin" />
            <p>{error ? error : `$${prices.bitcoin}`}</p>
          </div>
          <div className="price-item">
            <img className="price-icon" src="https://s3-symbol-logo.tradingview.com/metal/gold--big.svg" alt="Gold" />
            <p>{error ? error : `$${prices.gold}`}</p>
          </div>
          <div className="price-item">
            <img className="price-icon" src="https://s3-symbol-logo.tradingview.com/crude-oil--big.svg" alt="Oil" />
            <p>{error ? error : `$${prices.oil}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
