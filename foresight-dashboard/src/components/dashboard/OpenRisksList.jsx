import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Chip, Skeleton
} from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const severityColor = (level) => {
    switch (level) {
        case 'Critical': return 'error';
        case 'High': return 'warning';
        case 'Medium': return 'primary';
        default: return 'default';
    }
};

const severityRank = {
    Critical: 1,
    High: 2,
    Medium: 3,
    Low: 4
};

const OpenRisksList = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [risks, setRisks] = useState([]);

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            const sorted = [...data].sort(
                (a, b) => severityRank[a.severity] - severityRank[b.severity]
            );
            setRisks(sorted);
            setLoading(false);
        }, 500); // fast switch for demo

        return () => clearTimeout(timer);
    }, [data]);

    return (
        <Paper sx={(theme) => ({
            p: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        })}>
            <Typography variant="subtitle1" gutterBottom>
                Open Risks
            </Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Severity</TableCell>
                            <TableCell>Owner</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading
                            ? Array.from({ length: 3 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell><Skeleton width={60} /></TableCell>
                                    <TableCell><Skeleton width="80%" /></TableCell>
                                    <TableCell><Skeleton width={50} /></TableCell>
                                    <TableCell><Skeleton width={70} /></TableCell>
                                </TableRow>
                            ))
                            : risks.map((risk) => (
                                <TableRow
                                    key={risk.id}
                                    hover
                                    sx={{
                                        transition: '0.3s',
                                        '&:hover': { backgroundColor: 'rgba(0,0,0,0.03)' }
                                    }}
                                >
                                    <TableCell>{risk.id}</TableCell>
                                    <TableCell>
                                        <WarningIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                                        {risk.name}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={risk.severity}
                                            color={severityColor(risk.severity)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>{risk.owner}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default OpenRisksList;
