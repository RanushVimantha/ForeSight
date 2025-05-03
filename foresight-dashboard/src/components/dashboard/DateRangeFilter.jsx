import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DateRangeFilter = ({ value, onChange }) => {
    return (
        <Box sx={{ mb: 2 }}>
            <FormControl size="small">
                <InputLabel>Date Range</InputLabel>
                <Select
                    value={value}
                    label="Date Range"
                    onChange={(e) => onChange(e.target.value)}
                    sx={{ minWidth: 150 }}
                >
                    <MenuItem value="7d">Last 7 days</MenuItem>
                    <MenuItem value="30d">Last 30 days</MenuItem>
                    <MenuItem value="90d">Last 90 days</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default DateRangeFilter;
