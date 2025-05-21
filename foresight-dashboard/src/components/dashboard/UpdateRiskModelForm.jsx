import React, { useState } from 'react';
import {
  Box, Typography, MenuItem, TextField, Button, Alert
} from '@mui/material';
import axios from 'axios';

const UpdateRiskModelForm = ({ project }) => {
  const [actualRisk, setActualRisk] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async () => {
    if (!actualRisk) return;

    const payload = {
      project_id: project.id,
      project_type: project.project_type || 'Web',
      budget_rs: project.budget_lkr,
      duration_days: project.duration_days,
      team_size: project.team_size,
      scope_changes: 2,
      client_type: 'Local',
      technology_stack: 'React',
      developer_experience_avg: 3.5,
      agile_practice: 'Yes',
      client_rating: 3,
      past_delays: 1,
      actual_risk_level: actualRisk
    };


    try {
      const res = await axios.post('http://127.0.0.1:5001/update-model', payload);
      setStatus({ type: 'success', message: 'Model updated successfully.' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Update failed.' });
      console.error(error);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">📤 Submit Final Project Risk Outcome</Typography>
      <TextField
        select
        label="Actual Risk Level"
        value={actualRisk}
        onChange={(e) => setActualRisk(e.target.value)}
        sx={{ mt: 2, mb: 2, width: 250 }}
      >
        {['Low', 'Medium', 'High'].map((level) => (
          <MenuItem key={level} value={level}>{level}</MenuItem>
        ))}
      </TextField>
      <Box>
        <Button variant="contained" onClick={handleSubmit} disabled={!actualRisk}>
          Submit to AI
        </Button>
      </Box>

      {status && (
        <Alert severity={status.type} sx={{ mt: 2 }}>
          {status.message}
        </Alert>
      )}
    </Box>
  );
};

export default UpdateRiskModelForm;
