import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { Bar } from 'react-chartjs-2';
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

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Risk Events',
                data: [3, 5, 2, 8, 4],
                backgroundColor: theme.palette.mode === 'dark' ? '#ef9a9a' : '#ef5350',
            },
        ],
    };

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
        <Paper sx={(theme) => ({
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        })}>
            <Typography variant="subtitle1" gutterBottom>
                Risk Events Over Time
            </Typography>
            <Bar data={data} options={options} />
        </Paper>
    );
};

export default RiskAnalysisChart;
