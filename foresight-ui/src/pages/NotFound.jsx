import React from "react";
import { Typography, Box, Container } from "@mui/material";

function NotFound() {
  return (
    <Container>
      <Box my={5}>
        <Typography variant="h3">404</Typography>
        <Typography variant="h6">Page Not Found</Typography>
      </Box>
    </Container>
  );
}

export default NotFound;
