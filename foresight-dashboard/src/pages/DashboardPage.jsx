import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Divider } from '@mui/material';
import SummaryCards from '@components/dashboard/SummaryCards';
import RiskLevelPanel from '@components/dashboard/RiskLevelPanel';
import RiskAnalysisChart from '@components/dashboard/RiskAnalysisChart';
import KeyRiskFactorsChart from '@components/dashboard/KeyRiskFactorsChart';
import MitigationsList from '@components/dashboard/MitigationsList';
import LatestProjects from '@components/dashboard/LatestProjects';
import ModelKPIs from '@components/dashboard/ModelKPIs';
import AlertsPanel from '@components/dashboard/AlertsPanel';
import RecentActivity from '@components/dashboard/RecentActivity';
import DateRangeFilter from '@components/dashboard/DateRangeFilter';
import OpenRisksList from '@components/dashboard/OpenRisksList';
import RiskCategoryPieChart from '@components/dashboard/RiskCategoryPieChart';
import IncidentSeverityBarChart from '@components/dashboard/IncidentSeverityBarChart';

const mockDataByRange = {
    '7d': {
        summary: { projects: 25, risks: 7, mitigations: 12 },
        kpis: { drift: 'Low', accuracy: '94%', uptime: '99.9%' },
        risks: [
            { id: 'RISK-003', name: 'Latency Issue', severity: 'Critical', owner: 'Infrastructure' },
            { id: 'RISK-001', name: 'Data Drift Detected', severity: 'High', owner: 'Team A' },
        ],
        categoryData: [10, 7, 5, 3],
        severityData: [12, 8, 4, 2],
    },
    '30d': {
        summary: { projects: 30, risks: 12, mitigations: 18 },
        kpis: { drift: 'Medium', accuracy: '92%', uptime: '99.5%' },
        risks: [
            { id: 'RISK-005', name: 'Security Vulnerability', severity: 'High', owner: 'Security' },
            { id: 'RISK-002', name: 'Model Bias Flag', severity: 'Medium', owner: 'Team B' },
            { id: 'RISK-004', name: 'Compliance Gap', severity: 'Low', owner: 'Legal' },
        ],
        categoryData: [15, 10, 8, 5],
        severityData: [10, 12, 6, 4],
    },
    '90d': {
        summary: { projects: 35, risks: 20, mitigations: 25 },
        kpis: { drift: 'High', accuracy: '89%', uptime: '99.0%' },
        risks: [
            { id: 'RISK-006', name: 'Model Overfitting', severity: 'Critical', owner: 'Team C' },
            { id: 'RISK-007', name: 'Unpatched Vulnerability', severity: 'High', owner: 'Ops' },
        ],
        categoryData: [20, 15, 10, 7],
        severityData: [8, 14, 10, 6],
    }
};

const DashboardPage = () => {
    const [dateRange, setDateRange] = useState('7d');
    const [summaryData, setSummaryData] = useState(mockDataByRange['7d'].summary);
    const [kpisData, setKpisData] = useState(mockDataByRange['7d'].kpis);
    const [risksData, setRisksData] = useState(mockDataByRange['7d'].risks);
    const [categoryData, setCategoryData] = useState(mockDataByRange['7d'].categoryData);
    const [severityData, setSeverityData] = useState(mockDataByRange['7d'].severityData);

    useEffect(() => {
        const data = mockDataByRange[dateRange];
        setSummaryData(data.summary);
        setKpisData(data.kpis);
        setRisksData(data.risks);
        setCategoryData(data.categoryData);
        setSeverityData(data.severityData);
    }, [dateRange]);

    return (
        <Box sx={{ backgroundColor: '#f4f6f8', minHeight: '100vh', py: 3 }}>
            <Container maxWidth="xl">
                <Typography variant="h4" gutterBottom>
                    AI Risk Management Dashboard
                </Typography>

                <DateRangeFilter value={dateRange} onChange={setDateRange} />

                {/* Summary Cards and Latest Projects */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 1 // significantly reduced bottom margin
                    }}
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <SummaryCards data={summaryData} />
                    </Box>
                    <Box sx={{ width: { xs: '100%', md: 350 }, flexShrink: 0 }}>
                        <LatestProjects />
                    </Box>
                </Box>

                {/* Incident Severity Chart (tight gap) */}
                <Grid container spacing={1} sx={{ mb: 1 }}>
                    <Grid item xs={12}>
                        <IncidentSeverityBarChart data={severityData} />
                    </Grid>
                </Grid>

                {/* Model KPIs */}
                <ModelKPIs data={kpisData} />

                <Divider sx={{ my: 2 }} />

                <Typography variant="h5" gutterBottom>Risk Overview</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <RiskLevelPanel />
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <RiskAnalysisChart />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <KeyRiskFactorsChart />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <MitigationsList />
                            <AlertsPanel />
                        </Box>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <RiskCategoryPieChart data={categoryData} />
                    </Grid>
                </Grid>

                <Divider sx={{ my: 2 }} />
                <OpenRisksList data={risksData} />

                <Divider sx={{ my: 2 }} />
                <RecentActivity />
            </Container>
        </Box>
    );
};

export default DashboardPage;
