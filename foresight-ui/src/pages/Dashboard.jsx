import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import RiskChart from "../components/RiskChart";

function Dashboard() {
  const [risks, setRisks] = useState([]);
  const [totalRisks, setTotalRisks] = useState(0);
  const [highSeverityPercent, setHighSeverityPercent] = useState(0);
  const [avgProbability, setAvgProbability] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/risks")
      .then((response) => {
        const riskData = response.data;
        setRisks(riskData);
        calculateAnalytics(riskData);
      })
      .catch((error) => {
        console.error("Error fetching risks:", error);
      });
  }, []);

  const calculateAnalytics = (riskData) => {
    const total = riskData.length;
    setTotalRisks(total);

    if (total === 0) {
      setHighSeverityPercent(0);
      setAvgProbability(0);
      return;
    }

    // High severity: probability * impact > 500
    const highSeverity = riskData.filter(r => (r.probability * (r.impact || 1)) > 500);
    setHighSeverityPercent(((highSeverity.length / total) * 100).toFixed(2));

    // Average probability
    const avgProb = riskData.reduce((sum, r) => sum + r.probability, 0) / total;
    setAvgProbability(avgProb.toFixed(2));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6">Total Risks</Typography>
              <Typography variant="h4">{totalRisks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#ffecb3" }}>
            <CardContent>
              <Typography variant="h6">High Severity %</Typography>
              <Typography variant="h4">{highSeverityPercent}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#c8e6c9" }}>
            <CardContent>
              <Typography variant="h6">Avg. Probability</Typography>
              <Typography variant="h4">{avgProbability}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Risk Levels Chart
              </Typography>
              <RiskChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
