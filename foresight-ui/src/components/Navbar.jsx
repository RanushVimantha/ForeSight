import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ForeSight Risk Manager
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/risks">Risks</Button>
        {user ? (
          <>
            <Typography sx={{ mx: 2 }}>Hello, {user.username}</Typography>
            <Button color="inherit" component={Link} to="/profile">Profile</Button>
            <Button color="inherit" component={Link} to="/risks/new">Add Risk</Button>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/profile">Profile</Button>

        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
