"use client";
// aipg-final/app/admin-tools/page.js
import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [aipgMarketData, setAipgMarketData] = useState({ price: null, volume: null });
  const [sevenSeasMarketData, setSevenSeasMarketData] = useState({ price: null, volume: null });
  const [nonKYCMarketData, setNonKYCMarketData] = useState({ price: null, volume: null }); // New state for NonKYC
  const [tradeOgreMarketData, setTradeOgreMarketData] = useState({ price: null, volume: null }); // New state for TradeOgre

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch('https://api.xeggex.com/api/v2/market/getbysymbol/AIPG_USDT');
        const data = await response.json();
        setAipgMarketData({
          price: data.lastPrice, // Use 'lastPrice' for the last traded price
          volume: data.volume, // Use 'volume' for the trading volume
        });
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
    const intervalId = setInterval(fetchMarketData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    const fetchSevenSeasMarketData = async () => {
      try {
        const response = await fetch('https://www.sevenseas.exchange/api/v1/markets/AIPG-USDT');
        const data = await response.json();
        setSevenSeasMarketData({
          price: data.lastPrice,
          volume: data.volume,
        });
      } catch (error) {
        console.error('Error fetching Seven Seas market data:', error);
      }
    };

    fetchSevenSeasMarketData();
    const intervalId = setInterval(fetchSevenSeasMarketData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    // Fetch data from NonKYC
    const fetchNonKYCMarketData = async () => {
      try {
        const response = await fetch('https://api.nonkyc.io/api/v2/market/getbysymbol/AIPG_USDT');
        const data = await response.json();
        setNonKYCMarketData({
          price: data.lastPrice,
          volume: data.volume,
        });
      } catch (error) {
        console.error('Error fetching NonKYC market data:', error);
      }
    };

    fetchNonKYCMarketData();
    const intervalId = setInterval(fetchNonKYCMarketData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    // Fetch data from TradeOgre
    const fetchTradeOgreMarketData = async () => {
      try {
        const response = await fetch('https://tradeogre.com/api/v1/ticker/aipg-usdt');
        const data = await response.json();
        setTradeOgreMarketData({
          price: data.price,
          volume: data.volume,
        });
      } catch (error) {
        console.error('Error fetching TradeOgre market data:', error);
      }
    };

    fetchTradeOgreMarketData();
    const intervalId = setInterval(fetchTradeOgreMarketData, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Tools</h1>
      
      {/* Section for Useful Links */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-center">Useful Links</h2>
        <div className="flex flex-col items-center gap-2">
          <div>
            <a href="https://www.example1.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
              Example 1
            </a>
            <span className="ml-2 text-gray-600">- Description for Example 1</span>
          </div>
          <div>
            <a href="https://www.example2.com" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-700">
              Example 2
            </a>
            <span className="ml-2 text-gray-600">- Description for Example 2</span>
          </div>
          <div>
            <a href="https://www.example3.com" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:text-red-700">
              Example 3
            </a>
            <span className="ml-2 text-gray-600">- Description for Example 3</span>
          </div>
          {/* Add more links as needed */}
        </div>
      </div>

      {/* Section for AIPG_USDT market data */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-3 text-center">Market Data</h2>
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Xeggex</h3>
          <p>Price: {aipgMarketData.price}</p>
          <p>Volume: {aipgMarketData.volume}</p>
        </div>
      </div>

      {/* Section for Seven Seas AIPG_USDT market data */}
      <div className="mt-8">
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Seven Seas</h3>
          <p>Price: {sevenSeasMarketData.price}</p>
          <p>Volume: {sevenSeasMarketData.volume}</p>
        </div>
      </div>

      {/* Section for NonKYC AIPG_USDT market data */}
      <div className="mt-8">
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">NonKYC</h3>
          <p>Price: {nonKYCMarketData.price}</p>
          <p>Volume: {nonKYCMarketData.volume}</p>
        </div>
      </div>

      {/* Section for TradeOgre AIPG_USDT market data */}
      <div className="mt-8">
        <div className="p-4 border rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">TradeOgre</h3>
          <p>Price: {tradeOgreMarketData.price}</p>
          <p>Volume: {tradeOgreMarketData.volume}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
