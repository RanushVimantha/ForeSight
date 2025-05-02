import React from "react";
import { Typography, Container, Box } from "@mui/material";
import RiskChart from "../components/RiskChart";

function Dashboard() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4">Welcome to ForeSight</Typography>
        <Typography variant="body1">
          Track, predict, and mitigate risks across your IT projects.
        </Typography>
      </Box>
      <Box my={4}>
        <RiskChart />
      </Box>
    </Container>
  );
}

export default Dashboard;
