import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import RiskChart from "../components/RiskChart";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Assessment, Warning, TrackChanges } from "@mui/icons-material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Dashboard() {
  const [risks, setRisks] = useState([]);
  const [totalRisks, setTotalRisks] = useState(0);
  const [highSeverityPercent, setHighSeverityPercent] = useState(0);
  const [avgProbability, setAvgProbability] = useState(0);

  const [controlData, setControlData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [issueData, setIssueData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });
  const [typeData, setTypeData] = useState({
    labels: [],
    datasets: [{ data: [] }]
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/risks")
      .then((response) => {
        const riskData = response.data;
        setRisks(riskData);
        calculateKPIs(riskData);
        generateControlChart(riskData);
        generateIssueChart(riskData);
        generateTypeChart(riskData);
      })
      .catch((error) => {
        console.error("Error fetching risks:", error);
      });
  }, []);

  const calculateKPIs = (riskData) => {
    const total = riskData.length;
    setTotalRisks(total);

    if (total === 0) {
      setHighSeverityPercent(0);
      setAvgProbability(0);
      return;
    }

    const highSeverity = riskData.filter(r => (r.probability * (r.impact || 1)) > 500);
    setHighSeverityPercent(((highSeverity.length / total) * 100).toFixed(2));

    const avgProb = riskData.reduce((sum, r) => sum + r.probability, 0) / total;
    setAvgProbability(avgProb.toFixed(2));
  };

  const generateControlChart = (riskData) => {
    const categories = ["Effective", "Override", "Open"];
    const counts = categories.map(cat => riskData.filter(r => r.controlPerformance === cat).length);

    setControlData({
      labels: categories,
      datasets: [{
        data: counts.length > 0 ? counts : [0, 0, 0],
        backgroundColor: ["#4caf50", "#ff9800", "#f44336"]
      }]
    });
  };

  const generateIssueChart = (riskData) => {
    const categories = ["Impact High", "Impact Medium", "Impact Low"];
    const counts = [
      riskData.filter(r => r.issueImpact === "High").length,
      riskData.filter(r => r.issueImpact === "Medium").length,
      riskData.filter(r => r.issueImpact === "Low").length
    ];

    setIssueData({
      labels: categories,
      datasets: [{
        data: counts.length > 0 ? counts : [0, 0, 0],
        backgroundColor: ["#f44336", "#ffeb3b", "#8bc34a"]
      }]
    });
  };

  const generateTypeChart = (riskData) => {
    const typeCounts = {};
    riskData.forEach(r => {
      if (!r.type) return;
      if (!typeCounts[r.type]) typeCounts[r.type] = 0;
      typeCounts[r.type]++;
    });

    setTypeData({
      labels: Object.keys(typeCounts).length > 0 ? Object.keys(typeCounts) : ["No Data"],
      datasets: [{
        label: "Risk Count",
        data: Object.values(typeCounts).length > 0 ? Object.values(typeCounts) : [0],
        backgroundColor: "#2196f3"
      }]
    });
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3}>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e3f2fd" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Assessment fontSize="large" color="primary" />
                <Box>
                  <Typography variant="subtitle1">Total Risks</Typography>
                  <Typography variant="h4">{totalRisks}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#fff8e1" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Warning fontSize="large" sx={{ color: "#ff9800" }} />
                <Box>
                  <Typography variant="subtitle1">High Severity %</Typography>
                  <Typography variant="h4">{highSeverityPercent}%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ bgcolor: "#e8f5e9" }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <TrackChanges fontSize="large" sx={{ color: "#43a047" }} />
                <Box>
                  <Typography variant="subtitle1">Avg. Probability</Typography>
                  <Typography variant="h4">{avgProbability}%</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Pie Charts */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Control Performance</Typography>
              {controlData?.labels?.length > 0 ? (
                <Pie data={controlData} />
              ) : (
                <Typography>No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Open Issues</Typography>
              {issueData?.labels?.length > 0 ? (
                <Pie data={issueData} />
              ) : (
                <Typography>No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bar Chart */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Risk by Type</Typography>
              {typeData?.labels?.length > 0 ? (
                <Bar data={typeData} />
              ) : (
                <Typography>No data available</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Risk Level Chart */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Risk Levels Chart</Typography>
              <RiskChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Risk Matrix */}
      <Grid container spacing={3} sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <RiskMatrix risks={risks} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

////////////////// RISK MATRIX COMPONENT //////////////////

const RiskMatrix = ({ risks }) => {
  const maxLikelihood = 6;
  const maxImpact = 6;

  const matrix = Array.from({ length: maxLikelihood }, () =>
    Array(maxImpact).fill(0)
  );

  risks.forEach(risk => {
    const likelihood = Math.min(Math.max(risk.likelihood || 1, 1), maxLikelihood);
    const impact = Math.min(Math.max(risk.impact || 1, 1), maxImpact);
    matrix[likelihood - 1][impact - 1]++;
  });

  const getColor = (count) => {
    if (count === 0) return "#e0e0e0";
    if (count < 3) return "#c8e6c9";
    if (count < 6) return "#fff59d";
    return "#f44336";
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Risk Matrix (Likelihood vs Impact)</Typography>
      <Grid container spacing={0} sx={{ border: "1px solid #ccc" }}>
        <Grid item xs={1}>
          <Typography>Lik / Imp</Typography>
        </Grid>
        {[...Array(maxImpact)].map((_, col) => (
          <Grid item xs={1} key={`header-${col}`}>
            <Typography align="center">{col + 1}</Typography>
          </Grid>
        ))}

        {matrix.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Grid item xs={1}>
              <Typography>{rowIndex + 1}</Typography>
            </Grid>
            {row.map((count, colIndex) => (
              <Grid
                item
                xs={1}
                key={`cell-${rowIndex}-${colIndex}`}
                sx={{
                  height: 50,
                  bgcolor: getColor(count),
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography>{count}</Typography>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};
