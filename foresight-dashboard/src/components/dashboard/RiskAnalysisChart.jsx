import React, { useEffect, useState } from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RiskAnalysisChart = () => {
  const theme = useTheme();
  const [riskData, setRiskData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://127.0.0.1:5001/log-summary');
        const labels = res.data.map(item => item.risk);
        const counts = res.data.map(item => item.count);

        setRiskData({
          labels: labels,
          datasets: [
            {
              label: 'Submitted Projects',
              data: counts,
              backgroundColor: theme.palette.mode === 'dark' ? '#ef9a9a' : '#ef5350',
            }
          ]
        });
      } catch (err) {
        console.error("❌ Failed to load risk summary:", err);
      }
    };

    fetchData();
  }, [theme]);

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: theme.palette.text.primary },
      },
      x: {
        ticks: { color: theme.palette.text.primary },
      },
    },
  };

  return (
    <Paper sx={{
      p: 3,
      borderRadius: 3,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary
    }}>
      <Typography variant="subtitle1" gutterBottom>
        📊 Submitted Risk Levels
      </Typography>
      <Bar data={riskData} options={options} />
    </Paper>
  );
};

export default RiskAnalysisChart;
