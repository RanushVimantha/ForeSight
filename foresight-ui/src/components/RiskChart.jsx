import React, { useEffect, useState } from "react";
import axios from "axios";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function RiskChart() {
  const [chartData, setChartData] = useState({
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        label: "Number of Risks",
        data: [0, 0, 0],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
      }
    ]
  });

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/risks")
      .then((response) => {
        const risks = response.data;
        let low = 0, medium = 0, high = 0;

        risks.forEach((risk) => {
          const score = risk.probability * (risk.impact || 1);
          if (score < 200) low++;
          else if (score <= 500) medium++;
          else high++;
        });

        setChartData({
          labels: ["Low", "Medium", "High"],
          datasets: [
            {
              label: "Number of Risks",
              data: [low, medium, high],
              backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
            }
          ]
        });
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  };

  useEffect(() => {
    fetchData(); // Initial load
    const interval = setInterval(fetchData, 10000); // Auto-refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Risk Levels Distribution (Live Data)" }
    }
  };

  return <Bar data={chartData} options={options} />;
}

export default RiskChart;
