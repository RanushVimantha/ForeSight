import React from "react";
import { Typography, Grid, Box } from "@mui/material";

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
      <Typography variant="h6" gutterBottom>Risk Matrix (Likelihood × Impact)</Typography>
      <Grid container spacing={0} sx={{ border: "1px solid #ccc" }}>
        <Grid item xs={1}>
          <Typography fontWeight="bold">Lik / Imp</Typography>
        </Grid>
        {[...Array(maxImpact)].map((_, col) => (
          <Grid item xs={1} key={`header-${col}`}>
            <Typography align="center" fontWeight="bold">{col + 1}</Typography>
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

export default RiskMatrix;
