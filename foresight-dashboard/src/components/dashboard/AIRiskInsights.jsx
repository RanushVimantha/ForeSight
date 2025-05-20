import React, { useEffect, useState } from 'react';
import {
  CardContent, Typography, CircularProgress, Box, List, ListItem, ListItemIcon, ListItemText, Button
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import InsightsIcon from '@mui/icons-material/Insights';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import TimelineIcon from '@mui/icons-material/Timeline';
import RefreshIcon from '@mui/icons-material/Refresh';
import { predictRisk, simulateRisk, explainInstance } from '../../api/aiService';

const AIRiskInsights = ({ project }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeProjectRisk = async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      const input = {
        project_type: projectData.project_type || 'Web',
        budget_rs: projectData.budget_lkr || 1000000,
        duration_days: projectData.duration_days || 90,
        team_size: projectData.team_size || 5,
        scope_changes: 2,
        client_type: 'Local',
        technology_stack: 'React',
        developer_experience_avg: 3.5,
        agile_practice: 'Yes',
        client_rating: 3,
        past_delays: 1
      };

      const prediction = await predictRisk(input);
      const simulation = await simulateRisk({
        budget_mean: input.budget_rs,
        budget_std: 250000,
        duration_mean: input.duration_days,
        duration_std: 25
      });

      let explanation;
      try {
        explanation = await explainInstance(input);
      } catch (shapError) {
        console.warn("⚠️ SHAP error:", shapError);
        explanation = { data: { explanation: [] } };
      }

      setResult({
        prediction: prediction.data,
        simulation: simulation.data,
        explanation: explanation?.data || { explanation: [] }
      });
    } catch (err) {
      console.error("❌ AI Risk Evaluation Failed:", err);
      setError('Failed to fetch AI insights. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project) {
      analyzeProjectRisk(project);
    }
  }, [project]);

  if (loading) {
    return (
      <CardContent>
        <Typography variant="body2">🕐 Analyzing risk...</Typography>
        <CircularProgress size={24} sx={{ mt: 2 }} />
      </CardContent>
    );
  }

  if (error) {
    return (
      <CardContent>
        <Typography color="error">⚠️ {error}</Typography>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => analyzeProjectRisk(project)}>
          Retry
        </Button>
      </CardContent>
    );
  }

  if (!result) {
    return (
      <CardContent>
        <Typography variant="body2">🟡 Waiting for AI analysis results...</Typography>
      </CardContent>
    );
  }

  const chartData = (result?.explanation?.explanation || []).map(([feature, value]) => ({
    name: feature,
    value: parseFloat(value.toFixed(3))
  }));

  return (
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">🧠 AI Risk Insights</Typography>
        <Button variant="outlined" startIcon={<RefreshIcon />} onClick={() => analyzeProjectRisk(project)}>
          Re-analyze
        </Button>
      </Box>

      <Typography variant="subtitle1" gutterBottom>
        <strong>Prediction:</strong> {result.prediction.prediction} ({result.prediction.confidence}% confidence)
      </Typography>

      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>🔍 Top Risk Contributors</Typography>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 60 }}>
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="textSecondary">
            No SHAP explanation available for this model.
          </Typography>
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="subtitle2" gutterBottom>📊 Monte Carlo Simulation</Typography>
        <List dense>
          <ListItem>
            <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText primary={`Risk Level: ${result.simulation.risk_level}`} />
          </ListItem>
          <ListItem>
            <ListItemIcon><WarningAmberIcon /></ListItemIcon>
            <ListItemText primary={`Budget Overrun: ${result.simulation.prob_budget_overrun}%`} />
          </ListItem>
          <ListItem>
            <ListItemIcon><WarningAmberIcon /></ListItemIcon>
            <ListItemText primary={`Duration Overrun: ${result.simulation.prob_duration_overrun}%`} />
          </ListItem>
        </List>
      </Box>
    </CardContent>
  );
};

export default AIRiskInsights;
