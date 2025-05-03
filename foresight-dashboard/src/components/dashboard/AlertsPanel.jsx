import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Chip, Skeleton } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const alerts = [
    { description: 'High latency detected in Model A', severity: 'High' },
    { description: 'Data drift warning for Project X', severity: 'Medium' },
    { description: 'Model accuracy dropped below 90%', severity: 'Critical' },
];

const AlertsPanel = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Paper sx={(theme) => ({
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary
        })}>
            <Typography variant="subtitle1" gutterBottom>
                Current Alerts
            </Typography>
            <List dense>
                {loading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <ListItem key={index}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" width="60%" sx={{ ml: 2 }} />
                        </ListItem>
                    ))
                    : alerts.map((alert, index) => (
                        <ListItem key={index}>
                            <ErrorOutlineIcon color="error" sx={{ mr: 1 }} />
                            <ListItemText primary={alert.description} />
                            <Chip
                                label={alert.severity}
                                color={
                                    alert.severity === 'Critical' ? 'error' :
                                        alert.severity === 'High' ? 'warning' : 'primary'
                                }
                                size="small"
                            />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    );
};

export default AlertsPanel;
