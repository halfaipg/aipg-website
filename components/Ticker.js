"use client";
import { useEffect, useState } from 'react';

export default function Ticker() {
  const [tickerData, setTickerData] = useState({});

  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await fetch('https://api.xeggex.com/api/v2/market/getbysymbol/AIPG_USDT');
        const data = await response.json();
        setTickerData(data);
      } catch (error) {
        console.error('Failed to fetch ticker data:', error);
      }
    };

    fetchTickerData();
    const intervalId = setInterval(fetchTickerData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-gray-800 text-white text-center py-2">
      <marquee>AIPG Price: {tickerData.lastPrice}</marquee>
    </div>
  );
}