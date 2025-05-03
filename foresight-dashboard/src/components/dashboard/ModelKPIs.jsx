import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Skeleton } from '@mui/material';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ModelKPIs = ({ data }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 500); // fast loading for demo
        return () => clearTimeout(timer);
    }, [data]);

    const kpis = [
        { label: 'Model Drift', value: data.drift, icon: <TrendingDownIcon color="success" /> },
        { label: 'Accuracy', value: data.accuracy, icon: <CheckCircleIcon color="primary" /> },
        { label: 'Uptime', value: data.uptime, icon: <TrendingUpIcon color="success" /> },
    ];

    return (
        <Grid container spacing={2}>
            {kpis.map((kpi, index) => (
                <Grid item xs={12} md={4} key={index}>
                    <Paper sx={(theme) => ({
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                    })}>
                        {loading ? (
                            <>
                                <Skeleton variant="circular" width={30} height={30} />
                                <Skeleton variant="text" width={100} />
                            </>
                        ) : (
                            <>
                                {kpi.icon}
                                <Typography variant="body1">
                                    <strong>{kpi.label}:</strong> {kpi.value}
                                </Typography>
                            </>
                        )}
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

export default ModelKPIs;
