import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, LinearProgress, Skeleton } from '@mui/material';

const RiskLevelPanel = () => {
    const [loading, setLoading] = useState(true);
    const riskLevel = 78;

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
                Overall Risk Level
            </Typography>
            {loading ? (
                <>
                    <Skeleton variant="text" width={80} height={50} />
                    <Skeleton variant="rectangular" width="100%" height={10} sx={{ borderRadius: 5 }} />
                </>
            ) : (
                <>
                    <Typography variant="h3" color="error">
                        {riskLevel}%
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <LinearProgress
                            variant="determinate"
                            value={riskLevel}
                            color="error"
                            sx={{ height: 10, borderRadius: 5 }}
                        />
                    </Box>
                </>
            )}
        </Paper>
    );
};

export default RiskLevelPanel;
