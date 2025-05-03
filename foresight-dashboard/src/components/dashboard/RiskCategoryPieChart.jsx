import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RiskCategoryPieChart = ({ data }) => {
    const chartData = {
        labels: ['Model Drift', 'Data Bias', 'Infrastructure', 'Security'],
        datasets: [{
            label: 'Risk Categories',
            data: data,
            backgroundColor: [
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(255, 99, 132, 0.5)'
            ],
            borderWidth: 1,
        }]
    };

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                Risk Categories
            </Typography>
            <Pie data={chartData} />
        </Paper>
    );
};

export default RiskCategoryPieChart;
