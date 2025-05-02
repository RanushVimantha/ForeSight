import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

function RiskEntry() {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useContext(AuthContext);

  const onSubmit = (data) => {
    const token = localStorage.getItem("token");  // ✅ Get token

    axios
      .post(
        "http://localhost:5000/api/risks",
        {
          project: data.project,
          description: data.description,
          probability: parseInt(data.probability),
          impact: parseInt(data.impact),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // ✅ Attach token here
          },
        }
      )
      .then((response) => {
        toast.success("Risk created successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Error saving risk:", error.response?.data || error.message);
        toast.error("Failed to create risk. Check your input.");
      });
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5">Add New Risk</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Project Name"
            {...register("project")}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Risk Description"
            {...register("description")}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Probability (%)"
            type="number"
            {...register("probability")}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Impact (1–10)"
            type="number"
            {...register("impact")}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        <ToastContainer />
      </Box>
    </Container>
  );
}

export default RiskEntry;
