import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Skeleton } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const activities = [
    { description: 'User John mitigated Risk #5', time: '5 mins ago' },
    { description: 'Model B retrained successfully', time: '30 mins ago' },
    { description: 'Project Y created', time: '1 hour ago' },
    { description: 'Admin updated risk threshold', time: '2 hours ago' },
];

const RecentActivity = () => {
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
                Recent Activity
            </Typography>
            <List dense>
                {loading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <ListItem key={index}>
                            <Skeleton variant="circular" width={24} height={24} />
                            <Skeleton variant="text" width="60%" sx={{ ml: 2 }} />
                        </ListItem>
                    ))
                    : activities.map((act, index) => (
                        <ListItem key={index}>
                            <AccessTimeIcon sx={{ mr: 1 }} />
                            <ListItemText primary={act.description} secondary={act.time} />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    );
};

export default RecentActivity;
