import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RiskChart = () => {
  const data = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        label: "Risk Levels",
        data: [5, 8, 3, 2], // Example data
        backgroundColor: ["#81c784", "#fff176", "#ffb74d", "#e57373"]
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Count: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default RiskChart;
