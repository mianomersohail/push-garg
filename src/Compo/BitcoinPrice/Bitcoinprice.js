import React, { useEffect, useState } from "react";
import './BitcoinPrice.css'; // Add your CSS here

const PriceTicker = () => {
  const [prices, setPrices] = useState({
    bitcoin: 'Loading...',
    usd: 'Loading...',
    oil: 'Loading...',
    gold: 'Loading...',
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        // Fetch Bitcoin price from CoinGecko
        const bitcoinResponse = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const bitcoinData = await bitcoinResponse.json();
        
        // Fetch US Oil price from Alpha Vantage
        const apiKey = 'YOUR_ALPHA_VANTAGE_API_KEY';
        const oilResponse = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=WTICOUSD&apikey=${apiKey}`);
        const oilData = await oilResponse.json();
        
        // Fetch Gold price from Alpha Vantage
        const goldResponse = await fetch(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=XAU&to_currency=USD&apikey=${apiKey}`);
        const goldData = await goldResponse.json();

        // Check if data exists and set the state
        setPrices({
          bitcoin: bitcoinData.bitcoin ? `$${bitcoinData.bitcoin.usd}` : 'Error',
          usd: '1 USD = 1 USD', // Mocked conversion
          oil: oilData['Time Series (Daily)'] ? `$${oilData['Time Series (Daily)'][Object.keys(oilData['Time Series (Daily)'])[0]]['4. close']} per barrel` : 'Error',
          gold: goldData['Realtime Currency Exchange Rate'] ? `$${goldData['Realtime Currency Exchange Rate']['5. Exchange Rate']} per ounce` : 'Error',
        });
      } catch (error) {
        console.error("Error fetching price data: ", error);
        setPrices({
          bitcoin: 'Error',
          usd: 'Error',
          oil: 'Error',
          gold: 'Error',
        });
      }
    };

    fetchPrices();

    // Optionally refresh prices every minute
    const interval = setInterval(fetchPrices, 60000); // Refresh every 60 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="price-ticker">
      <img src=""/><span>Bitcoin: {prices.bitcoin}</span>
      <span>USD: 276PKR</span>
      <span>US Oil: 69.41</span>
      <span>Gold: 2.568$</span>
    </div>
  );
};

export default PriceTicker;
