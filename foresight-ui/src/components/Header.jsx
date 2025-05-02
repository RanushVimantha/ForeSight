import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - 240px)`,
        ml: `240px`,
        backgroundColor: "#f5f5f5",
        color: "#333",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        height: 64
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          ForeSight Risk Management
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
