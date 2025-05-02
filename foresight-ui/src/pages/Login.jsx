import React, { useContext } from "react";
import { Container, Card, CardContent, Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", data);
      login(res.data.token);
      toast.success("Logged in successfully!");

      // ✅ Redirect to dashboard after login
      navigate("/dashboard");

    } catch {
      toast.error("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="xs">
      <ToastContainer />
      <Card sx={{ mt: 8, p: 2 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            ForeSight Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Username" fullWidth margin="normal" {...register("username")} required />
            <TextField label="Password" type="password" fullWidth margin="normal" {...register("password")} required />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default Login;
