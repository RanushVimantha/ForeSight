import React from 'react';
import { Paper, Typography, useTheme } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const KeyRiskFactorsChart = () => {
    const theme = useTheme();

    const data = {
        labels: ['Data Drift', 'Model Bias', 'Operational Issues'],
        datasets: [{
            data: [8, 5, 3],
            backgroundColor: theme.palette.mode === 'dark'
                ? ['#64b5f6', '#ffcc80', '#81c784']
                : ['#42a5f5', '#ffb74d', '#66bb6a'],
            borderWidth: 1,
        }],
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    color: theme.palette.text.primary
                }
            }
        }
    };

    return (
        <Paper sx={(theme) => ({
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        })}>
            <Typography variant="subtitle1" gutterBottom>
                Key Risk Factors
            </Typography>
            <Doughnut data={data} options={options} />
        </Paper>
    );
};

export default KeyRiskFactorsChart;
