import React, { useContext } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";   // ✅ use global axios
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function RiskEntry() {
  const { register, handleSubmit } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post(
        "/risks",
        {
          ...data,
          probability: parseInt(data.probability),
          impact: parseInt(data.impact),
          likelihood: parseInt(data.likelihood)
        }
      );
      toast.success("Risk created successfully!");
      navigate("/risks");
    } catch (error) {
      console.error("Create risk error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.error || "Failed to create risk."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Create New Risk
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField fullWidth label="Project" {...register("project")} margin="normal" required />
          <TextField fullWidth label="Description" {...register("description")} margin="normal" required />
          <TextField fullWidth label="Probability (%)" type="number" {...register("probability")} margin="normal" required />
          <TextField fullWidth label="Impact" type="number" {...register("impact")} margin="normal" required />

          {/* New fields for advanced dashboard */}
          <TextField fullWidth label="Risk Type" {...register("type")} margin="normal" />
          <TextField fullWidth label="Control Performance" {...register("controlPerformance")} margin="normal" />
          <TextField fullWidth label="Issue Impact" {...register("issueImpact")} margin="normal" />
          <TextField fullWidth label="Likelihood (1-6)" type="number" {...register("likelihood")} margin="normal" />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default RiskEntry;
