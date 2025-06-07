import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale,  PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ coinHistory, coinName, currentPrice }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  if (!coinHistory || !coinHistory.data || !coinHistory.data.history) {
    return <div>Coin data is missing.</div>;
  }
  if (coinHistory.data.history.length === 0) {
    return <div>No historical data available for {coinName}.</div>;
  }
  if (coinHistory.data.history.length < 2) {
    return <div>Not enough data to display a chart for {coinName}.</div>;
  }

  coinHistory?.data?.history?.forEach((item) => {
    coinPrice.push(parseFloat(item.price));
    coinTimestamp.push(new Date(item.timestamp * 1000).toLocaleDateString());
  });

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: `Price in USD`,
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: (value) => `$${value}`,
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center my-4">
        <div>
          <h2 className="text-2xl font-semibold text-blue-600 md:mb-2">{coinName} Price Chart</h2>
        </div>
        <div className="flex flex-col md:items-end">
          <span className="text-blue-600 font-semibold">
            Change: {coinHistory?.data?.change}%
          </span>
          <span className="text-gray-700">
            Current {coinName} Price: ${currentPrice}
          </span>
        </div>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
