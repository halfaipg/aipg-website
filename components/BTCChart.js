"use client";

import { useEffect, useRef, useState } from 'react';

export default function BTCChart() {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candlestickSeriesRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Wait for container to be ready
    const init = async () => {
      try {
        // Dynamically import lightweight-charts to avoid SSR issues
        const lightweightCharts = await import('lightweight-charts');
        const { createChart, ColorType, CandlestickSeries, createSeriesMarkers } = lightweightCharts;
        
        // Wait for container to have dimensions
        let attempts = 0;
        while (attempts < 10) {
          if (chartContainerRef.current && chartContainerRef.current.clientWidth > 0) {
            break;
          }
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }
        
        if (!chartContainerRef.current || chartContainerRef.current.clientWidth === 0) {
          setError('Chart container not ready');
          setIsLoading(false);
          return;
        }
        
        await initializeChart(createChart, ColorType, CandlestickSeries, createSeriesMarkers);
        await loadChartData();
      } catch (err) {
        console.error('Error loading chart library:', err);
        setError(`Failed to load chart library: ${err.message}`);
        setIsLoading(false);
      }
    };
    
    init();

    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
      if (candlestickSeriesRef.current) {
        candlestickSeriesRef.current = null;
      }
    };
  }, []);

  const initializeChart = async (createChart, ColorType, CandlestickSeries, createSeriesMarkers) => {
    if (!chartContainerRef.current) return;

    let chart;
    let containerHeight;
    try {
      const containerWidth = chartContainerRef.current.clientWidth || 800;
      containerHeight = chartContainerRef.current.clientHeight || 700;
      
      // Check if createChart is available
      if (typeof createChart !== 'function') {
        throw new Error('createChart is not a function');
      }
      
      chart = createChart(chartContainerRef.current, {
        width: containerWidth,
        height: containerHeight,
        layout: {
          background: { type: ColorType.Solid, color: '#0b0e11' },
          textColor: '#eaecef',
        },
        grid: {
          vertLines: { color: '#2b3139' },
          horzLines: { color: '#2b3139' },
        },
        crosshair: {
          mode: 0, // Normal mode
        },
        rightPriceScale: {
          borderColor: '#2b3139',
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
        },
        timeScale: {
          borderColor: '#2b3139',
          timeVisible: true,
          secondsVisible: false,
          rightOffset: 0,  // No right offset - fill to edge
          barSpacing: 6,   // Tighter spacing to fill better
          minBarSpacing: 0.5,
          rightBarStaysOnScroll: true,  // Keep latest bar visible
          fixLeftEdge: false,  // Allow scrolling to fill
          fixRightEdge: false,  // Allow scrolling to fill
        },
      });

      // Check if chart has the addSeries method (v5 API)
      if (!chart || typeof chart.addSeries !== 'function') {
        console.error('Chart object:', chart);
        console.error('Chart methods:', Object.keys(chart || {}));
        throw new Error('addSeries is not a function on chart object');
      }

      // Use the new v5 API: addSeries with CandlestickSeries class
      let candlestickSeries;
      try {
        if (CandlestickSeries) {
          // v5 API: pass the series class
          candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor: '#00ff88',
            downColor: '#ff4444',
            borderUpColor: '#00ff88',
            borderDownColor: '#ff4444',
            wickUpColor: '#00ff88',
            wickDownColor: '#ff4444',
          });
        } else {
          // Fallback: try string-based approach
          candlestickSeries = chart.addSeries('Candlestick', {
            upColor: '#00ff88',
            downColor: '#ff4444',
            borderUpColor: '#00ff88',
            borderDownColor: '#ff4444',
            wickUpColor: '#00ff88',
            wickDownColor: '#ff4444',
          });
        }
      } catch (seriesErr) {
        console.error('Error adding series:', seriesErr);
        throw new Error(`Failed to add series: ${seriesErr.message}`);
      }

      chartRef.current = chart;
      candlestickSeriesRef.current = candlestickSeries;
      
      // Store createSeriesMarkers for later use
      if (createSeriesMarkers) {
        chartRef.current._createSeriesMarkers = createSeriesMarkers;
      }

      // Handle resize - make chart fill container
      const resizeObserver = new ResizeObserver(entries => {
        if (chartRef.current && entries.length > 0) {
          const { width, height } = entries[0].contentRect;
          chartRef.current.applyOptions({ 
            width: width || containerWidth, 
            height: height || containerHeight 
          });
        }
      });
      resizeObserver.observe(chartContainerRef.current);
    } catch (err) {
      console.error('Error initializing chart:', err);
      setError(`Chart initialization error: ${err.message}`);
      setIsLoading(false);
      throw err;
    }
  };

  const loadChartData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Use Next.js API route as proxy
      // Request all available data (CSV + CoinGecko recent) - no limit
      const response = await fetch('/api/btc-chart?timeframe=1d&symbol=BTC');
      
      if (!response.ok) {
        throw new Error('Failed to fetch chart data');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Prepare candlestick data
      // Lightweight Charts expects Unix timestamp in seconds for daily data
      // Data must be sorted in ascending order by time
      const candlestickData = data.data.map(bar => {
        const timestamp = Math.floor(bar.time / 1000); // Convert milliseconds to seconds
        return {
          time: timestamp,
          open: bar.open,
          high: bar.high,
          low: bar.low,
          close: bar.close,
        };
      })
      .filter(bar => bar.time > 0) // Filter out invalid timestamps
      .sort((a, b) => a.time - b.time); // Sort by time in ascending order

      // Prepare markers for entry/exit signals
      // Markers must also be sorted by time
      const markers = [];
      
      // Find the closest bar to 106.5k price for short entry marker
      let closestBarTo106_5k = null;
      let minPriceDiff = Infinity;
      
      data.data.forEach(bar => {
        // Check if this bar is close to 106.5k
        const priceDiff = Math.abs(bar.close - 106500);
        if (priceDiff < minPriceDiff) {
          minPriceDiff = priceDiff;
          closestBarTo106_5k = bar;
        }
        
        if (bar.signal && bar.signal !== 'hold') {
          const timestamp = Math.floor(bar.time / 1000); // Convert to seconds
          const isLong = bar.signal === 'long_entry';
          const isShort = bar.signal === 'short_entry';
          const isLongExit = bar.signal === 'long_exit';
          const isShortExit = bar.signal === 'short_exit';
          
          if (isLong) {
            markers.push({
              time: timestamp,
              position: 'belowBar',
              color: '#00ff88',
              shape: 'circle',
              text: 'LONG',
              size: 1.5
            });
          } else if (isShort) {
            markers.push({
              time: timestamp,
              position: 'aboveBar',
              color: '#ff4444',
              shape: 'circle',
              text: 'SHORT',
              size: 1.5
            });
          } else if (isLongExit || isShortExit) {
            markers.push({
              time: timestamp,
              position: isLongExit ? 'aboveBar' : 'belowBar',
              color: '#fcd535',
              shape: 'circle',
              text: 'EXIT',
              size: 1.2
            });
          }
        }
      });
      
      // Add short entry marker at 106.5k if we found a close bar
      if (closestBarTo106_5k) {
        const timestamp = Math.floor(closestBarTo106_5k.time / 1000);
        markers.push({
          time: timestamp,
          position: 'aboveBar',
          color: '#ff4444',
          shape: 'circle',
          text: 'SHORT',
          size: 1.5
        });
      }
      
      // Sort markers by time in ascending order
      markers.sort((a, b) => a.time - b.time);

      if (candlestickSeriesRef.current && candlestickData.length > 0) {
        candlestickSeriesRef.current.setData(candlestickData);
        if (markers.length > 0) {
          // In v5, markers are created using createSeriesMarkers
          try {
            // Import createSeriesMarkers dynamically if not already available
            const lightweightCharts = await import('lightweight-charts');
            const { createSeriesMarkers } = lightweightCharts;
            
            if (createSeriesMarkers && typeof createSeriesMarkers === 'function') {
              // v5 API: create markers primitive
              createSeriesMarkers(candlestickSeriesRef.current, markers);
            } else if (typeof candlestickSeriesRef.current.setMarkers === 'function') {
              // Fallback to v4 API if available
              candlestickSeriesRef.current.setMarkers(markers);
            } else {
              console.warn('Markers API not available');
            }
          } catch (markerErr) {
            console.error('Error setting markers:', markerErr);
            // Continue without markers if they fail
          }
        }
        
        // Zoom to show last year by default
        if (chartRef.current) {
          // First fit all content to establish the full range
          chartRef.current.timeScale().fitContent();
          
          // Then zoom to show only the last year (365 days)
          setTimeout(() => {
            const visibleRange = chartRef.current.timeScale().getVisibleLogicalRange();
            if (visibleRange && candlestickData.length > 0) {
              // Calculate how many bars represent 365 days
              const totalBars = visibleRange.to - visibleRange.from;
              const barsPerDay = totalBars / candlestickData.length;
              const barsForYear = 365 * barsPerDay;
              
              // Show last 365 days with 10% padding on right
              chartRef.current.timeScale().setVisibleLogicalRange({
                from: visibleRange.to - barsForYear * 1.1,
                to: visibleRange.to + barsForYear * 0.1
              });
            }
          }, 100);
        }
        
        console.log(`Loaded ${candlestickData.length} daily bars for chart`);
      } else {
        throw new Error('Chart not initialized or no data available');
      }

      setIsLoading(false);
    } catch (err) {
      console.error('Error loading chart data:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 text-center">
        <h3 className="text-xl font-bold text-white mb-2">BTC Daily Chart - Fund Entries & Exits</h3>
        <p className="text-gray-400 text-sm">
          Green markers = Long entries • Red markers = Short entries • Yellow markers = Exits
        </p>
      </div>
      
      <div 
        ref={chartContainerRef} 
        className="w-full bg-gray-900 rounded-xl overflow-hidden"
        style={{ height: '700px', minHeight: '700px', width: '100%' }}
      >
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-400">Loading chart...</div>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="text-red-400">Error: {error}</div>
          </div>
        )}
      </div>
    </div>
  );
}

