import React from 'react';
import { Paper, Typography } from '@mui/material';
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

const IncidentSeverityBarChart = ({ data }) => {
    const chartData = {
        labels: ['Low', 'Medium', 'High', 'Critical'],
        datasets: [{
            label: 'Incident Count',
            data: data,
            backgroundColor: [
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(255, 99, 132, 0.5)'
            ]
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        }
    };

    return (
        <Paper sx={{ p: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
                Incident Severity Distribution
            </Typography>
            <Bar data={chartData} options={options} />
        </Paper>
    );
};

export default IncidentSeverityBarChart;
