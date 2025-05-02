import React, { useEffect, useState } from "react";
import {
  Container, Grid, Card, CardContent, Typography, Box
} from "@mui/material";
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
  const [controlData, setControlData] = useState({
    labels: [], datasets: [{ data: [] }]
  });
  const [issueData, setIssueData] = useState({
    labels: [], datasets: [{ data: [] }]
  });
  const [typeData, setTypeData] = useState({
    labels: [], datasets: [{ data: [] }]
  });

  const [totalRisks, setTotalRisks] = useState(0);
  const [highSeverityPercent, setHighSeverityPercent] = useState(0);
  const [avgProbability, setAvgProbability] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/risks")
      .then((response) => {
        const riskData = response.data;
        setRisks(riskData);
        generateControlChart(riskData);
        generateIssueChart(riskData);
        generateTypeChart(riskData);
        calculateKPIs(riskData);
      })
      .catch((error) => {
        console.error("Error fetching risks:", error);
      });
  }, []);

  const generateControlChart = (riskData) => {
    const categories = ["Effective", "Override", "Open"];
    const counts = categories.map(cat =>
      riskData.filter(r => r.controlPerformance === cat).length
    );

    setControlData({
      labels: categories,
      datasets: [{
        data: counts.length > 0 ? counts : [0, 0, 0],
        backgroundColor: ["#4caf50", "#fb8c00", "#e53935"]
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
        backgroundColor: ["#e53935", "#fb8c00", "#43a047"]
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
        label: "Count",
        data: Object.values(typeCounts).length > 0 ? Object.values(typeCounts) : [0],
        backgroundColor: ["#1565c0"]
      }]
    });
  };

  const calculateKPIs = (riskData) => {
    const total = riskData.length;
    setTotalRisks(total);

    if (total === 0) {
      setHighSeverityPercent(0);
      setAvgProbability(0);
      return;
    }

    const highSeverity = riskData.filter(
      r => (r.probability * (r.impact || 1)) > 500
    );
    setHighSeverityPercent(((highSeverity.length / total) * 100).toFixed(2));

    const avgProb = riskData.reduce((sum, r) => sum + r.probability, 0) / total;
    setAvgProbability(avgProb.toFixed(2));
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Risk Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Total Risks</Typography>
              <Typography variant="h4" color="primary">{totalRisks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">High Severity %</Typography>
              <Typography variant="h4" color="error">{highSeverityPercent}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2">Avg. Probability</Typography>
              <Typography variant="h4" color="secondary">{avgProbability}%</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Two-column chart layout */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h6">Control Performance</Typography>
                  {controlData.labels.length > 0 ? (
                    <Pie data={controlData} />
                  ) : (
                    <Typography>No data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h6">Risk by Type</Typography>
                  {typeData.labels.length > 0 ? (
                    <Bar
                      data={{
                        labels: typeData.labels,
                        datasets: [{
                          ...typeData.datasets[0],
                          indexAxis: 'y'
                        }]
                      }}
                      options={{
                        indexAxis: 'y',
                        responsive: true
                      }}
                    />
                  ) : (
                    <Typography>No data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h6">Open Issues</Typography>
                  {issueData.labels.length > 0 ? (
                    <Pie data={issueData} />
                  ) : (
                    <Typography>No data available</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card>
                <CardContent>
                  <Typography variant="h6">Risk Levels Chart</Typography>
                  <RiskChart />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
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

////////////////// UPDATED RISK MATRIX COMPONENT //////////////////

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
    if (count === 0) return "#f5f5f5";
    if (count <= 2) return "#c8e6c9";
    if (count <= 5) return "#fff59d";
    if (count <= 8) return "#fb8c00";
    return "#e53935";
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Risk Matrix (Likelihood × Impact)
      </Typography>
      <Grid container spacing={0} sx={{ border: "1px solid #ccc" }}>
        <Grid item xs={1}>
          <Typography fontWeight="bold">Lik / Imp</Typography>
        </Grid>
        {[...Array(maxImpact)].map((_, col) => (
          <Grid item xs={1} key={`header-${col}`}>
            <Typography align="center" fontWeight="bold">
              {col + 1}
            </Typography>
          </Grid>
        ))}
        {matrix.map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <Grid item xs={1}>
              <Typography fontWeight="bold">{rowIndex + 1}</Typography>
            </Grid>
            {row.map((count, colIndex) => (
              <Grid
                item
                xs={1}
                key={`cell-${rowIndex}-${colIndex}`}
                sx={{
                  height: 60,
                  bgcolor: getColor(count),
                  border: "1px solid #ccc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Typography fontWeight="bold" fontSize={16}>
                  {count}
                </Typography>
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};
