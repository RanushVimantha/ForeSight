import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Divider } from '@mui/material';
import SummaryCards             from '@components/dashboard/SummaryCards';
import LatestProjects           from '@components/dashboard/LatestProjects';
import AlertsPanel              from '@components/dashboard/AlertsPanel';
import IncidentSeverityBarChart from '@components/dashboard/IncidentSeverityBarChart';
import ModelKPIs                from '@components/dashboard/ModelKPIs';
import DateRangeFilter          from '@components/dashboard/DateRangeFilter';
import RiskAnalysisChart        from '@components/dashboard/RiskAnalysisChart';
import KeyRiskFactorsChart      from '@components/dashboard/KeyRiskFactorsChart';
import MitigationsList          from '@components/dashboard/MitigationsList';
import RiskCategoryPieChart     from '@components/dashboard/RiskCategoryPieChart';
import OpenRisksList            from '@components/dashboard/OpenRisksList';
import RecentActivity           from '@components/dashboard/RecentActivity';

// Mock data including sample open risks
const mockDataByRange = {
  '7d': {
    summary: { projects: 25, risks: 7, mitigations: 12, incidentsSolved: 42 },
    severityData: [12, 8, 4, 2],
    kpis: { drift: 'Low', accuracy: '94%', uptime: '99.9%' },
    risks: [
      { id: 'RISK-003', name: 'Latency Issue', severity: 'Critical', owner: 'Infrastructure' },
      { id: 'RISK-001', name: 'Data Drift Detected', severity: 'High', owner: 'Team A' },
      { id: 'RISK-010', name: 'API Downtime', severity: 'Medium', owner: 'Ops' },
    ],
    categoryData: [10, 7, 5, 3],
  },
  '30d': {
    summary: { projects: 30, risks: 12, mitigations: 18, incidentsSolved: 105 },
    severityData: [10, 12, 6, 4],
    kpis: { drift: 'Medium', accuracy: '92%', uptime: '99.5%' },
    risks: [
      { id: 'RISK-005', name: 'Security Vulnerability', severity: 'High', owner: 'Security' },
      { id: 'RISK-002', name: 'Model Bias Flag', severity: 'Medium', owner: 'Team B' },
      { id: 'RISK-020', name: 'Data Loss', severity: 'Critical', owner: 'DBA' },
    ],
    categoryData: [15, 10, 8, 5],
  },
  '90d': {
    summary: { projects: 35, risks: 20, mitigations: 25, incidentsSolved: 210 },
    severityData: [8, 14, 10, 6],
    kpis: { drift: 'High', accuracy: '89%', uptime: '99.0%' },
    risks: [
      { id: 'RISK-006', name: 'Model Overfitting', severity: 'Critical', owner: 'Team C' },
      { id: 'RISK-007', name: 'Unpatched Vulnerability', severity: 'High', owner: 'Ops' },
      { id: 'RISK-030', name: 'Compliance Gap', severity: 'Low', owner: 'Legal' },
    ],
    categoryData: [20, 15, 10, 7],
  },
};

const DashboardPage = () => {
  const [dateRange, setDateRange] = useState('7d');
  const [data, setData] = useState(mockDataByRange['7d']);

  useEffect(() => {
    setData(mockDataByRange[dateRange]);
  }, [dateRange]);

  return (
    <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom>
          AI Risk Management Dashboard
        </Typography>

        <DateRangeFilter value={dateRange} onChange={setDateRange} />

        {/* Summary + Projects + Alerts */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: 2, mb: -58 }}>
          <Box sx={{ flexGrow: 1 }}>
            <SummaryCards data={data.summary} />
          </Box>
          <Box sx={{ width: { xs: '100%', md: 350 }, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <LatestProjects />
            <AlertsPanel />
          </Box>
        </Box>

        {/* Incident Severity */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <IncidentSeverityBarChart data={data.severityData} />
          </Box>
        </Box>

        {/* Model KPIs */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 4 }}>
          <ModelKPIs data={data.kpis} />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Risk Overview */}
        <Typography variant="h5" gutterBottom>
          Risk Overview
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} md={3}>
            <RiskAnalysisChart />
          </Grid>
          <Grid item xs={12} md={3}>
            <MitigationsList />
          </Grid>
          <Grid item xs={12} md={3}>
            <KeyRiskFactorsChart />
          </Grid>
          <Grid item xs={12} md={3}>
            <RiskCategoryPieChart data={data.categoryData} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Open Risks */}
        <Typography variant="h5" gutterBottom>
          Open Risks
        </Typography>
        <OpenRisksList data={data.risks} />

        <Divider sx={{ my: 2 }} />

        <RecentActivity />
      </Container>
    </Box>
  );
};

export default DashboardPage;