import fs from 'fs';
import path from 'path';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : null; // No limit by default - return all data

    // Step 1: Get recent data from CoinGecko API (last 365 days for real-time data)
    const coinGeckoResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    let recentData = [];
    if (coinGeckoResponse.ok) {
      const marketData = await coinGeckoResponse.json();
      
      if (marketData.prices && marketData.prices.length > 0) {
        // Convert CoinGecko daily prices to OHLC format
        recentData = marketData.prices.map(([timestamp, closePrice], index) => {
          const open = index > 0 ? marketData.prices[index - 1][1] : closePrice;
          const priceChange = index > 0 ? ((closePrice - open) / open) : 0;
          
          let high, low;
          if (priceChange > 0) {
            high = closePrice * (1 + Math.abs(priceChange) * 0.3);
            low = open * (1 - Math.abs(priceChange) * 0.2);
          } else if (priceChange < 0) {
            high = open * (1 + Math.abs(priceChange) * 0.2);
            low = closePrice * (1 - Math.abs(priceChange) * 0.3);
          } else {
            high = closePrice * 1.01;
            low = closePrice * 0.99;
          }
          
          high = Math.max(high, open, closePrice);
          low = Math.min(low, open, closePrice);
          
          return {
            time: timestamp,
            open,
            high,
            low,
            close: closePrice,
            signal: 'hold',
            volume: marketData.total_volumes?.[index]?.[1] || 0,
          };
        });
      }
    }

    // Step 2: Get historical data from CSV (2018-2025 data)
    const csvPath = path.join(process.cwd(), 'btc_1d_data_2018_to_2025.csv');
    let historicalData = [];
    
    if (fs.existsSync(csvPath)) {
      const csvContent = fs.readFileSync(csvPath, 'utf-8');
      const lines = csvContent.trim().split('\n');
      
      // Find the cutoff date - use the oldest CoinGecko data point as cutoff
      // CSV data older than this will be included
      const oldestRecentTime = recentData.length > 0 
        ? Math.min(...recentData.map(d => d.time))
        : Date.now();
      
      // Parse CSV data (skip header)
      // Format: Open time,Open,High,Low,Close,Volume,Close time,Quote asset volume,Number of trades,Taker buy base asset volume,Taker buy quote asset volume,Ignore
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const parts = line.split(',');
        if (parts.length < 6) continue;
        
        const [openTime, open, high, low, close, volume] = parts;
        
        if (!openTime || !open || !high || !low || !close) continue;
        
        // Parse date string: "2018-01-01 00:00:00.000000 UTC"
        const timestamp = new Date(openTime).getTime();
        
        if (isNaN(timestamp)) continue;
        
        // Only include CSV data that's older than the oldest CoinGecko data
        // Add a 1-day buffer to avoid duplicates
        if (timestamp < (oldestRecentTime - 24 * 60 * 60 * 1000)) {
          historicalData.push({
            time: timestamp,
            open: parseFloat(open),
            high: parseFloat(high),
            low: parseFloat(low),
            close: parseFloat(close),
            signal: 'hold',
            volume: parseFloat(volume) || 0,
          });
        }
      }
    }

    // Step 3: Combine data (historical first, then recent)
    const allData = [...historicalData, ...recentData];
    
    // Sort by time ascending (oldest first)
    allData.sort((a, b) => a.time - b.time);
    
    // Limit to requested amount (most recent N days) if limit is specified
    // Otherwise return all data
    const limitedData = limit && limit > 0 && limit < allData.length 
      ? allData.slice(-limit) 
      : allData;
    
    console.log(`Returning ${limitedData.length} data points (${historicalData.length} from CSV, ${recentData.length} from CoinGecko)`);
    
    return Response.json({
      symbol: 'BTC',
      timeframe: '1d',
      data: limitedData,
    });
  } catch (error) {
    console.error('Error fetching BTC chart data:', error);
    return Response.json(
      { error: error.message || 'Failed to fetch chart data' },
      { status: 500 }
    );
  }
}

