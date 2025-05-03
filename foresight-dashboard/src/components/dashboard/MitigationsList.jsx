import React, { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Chip, Skeleton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const mitigations = [
    { action: 'Retrain Model A', status: 'Pending' },
    { action: 'Data Quality Check', status: 'Completed' },
    { action: 'Audit User Access', status: 'In Progress' },
];

const MitigationsList = () => {
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
                Mitigations
            </Typography>
            <List>
                {loading
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <ListItem key={index}>
                            <Skeleton variant="text" width="80%" />
                        </ListItem>
                    ))
                    : mitigations.map((item, index) => (
                        <ListItem key={index} divider>
                            <ListItemText primary={item.action} />
                            <Chip
                                label={item.status}
                                icon={<CheckCircleIcon />}
                                color={
                                    item.status === 'Completed' ? 'success' :
                                        item.status === 'Pending' ? 'warning' :
                                            'primary'
                                }
                            />
                        </ListItem>
                    ))}
            </List>
        </Paper>
    );
};

export default MitigationsList;
