import React, { useContext } from "react";
import { Container, Typography, Button, Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/auth/change-password",
        {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      toast.success("Password changed successfully!");
      reset();
    } catch (error) {
      console.error("Password change error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.error || "Failed to change password."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
        <Typography variant="h6">Username: {user?.username}</Typography>
        <Typography variant="h6">Role: {user?.role}</Typography>

        <Box my={4}>
          <Typography variant="h5">Change Password</Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              {...register("oldPassword")}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register("newPassword")}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Change Password
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}

export default Profile;
