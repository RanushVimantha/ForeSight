import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

function RiskList() {
  const [risks, setRisks] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [currentRisk, setCurrentRisk] = useState({});

  const fetchRisks = () => {
    axios
      .get("http://localhost:5000/api/risks")
      .then((response) => {
        setRisks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching risks:", error);
      });
  };

  useEffect(() => {
    fetchRisks();
  }, []);

  const deleteRisk = (id) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:5000/api/risks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        toast.success("Risk deleted successfully");
        fetchRisks();
      })
      .catch((error) => {
        console.error("Delete failed:", error.response?.data || error.message);
        toast.error("Failed to delete risk.");
      });
  };

  const openEditModal = (risk) => {
    setCurrentRisk(risk);
    setEditOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentRisk({ ...currentRisk, [name]: value });
  };

  const submitEdit = () => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:5000/api/risks/${currentRisk.id}`,
        {
          project: currentRisk.project,
          description: currentRisk.description,
          probability: parseInt(currentRisk.probability),
          impact: parseInt(currentRisk.impact)
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(() => {
        toast.success("Risk updated successfully");
        setEditOpen(false);
        fetchRisks();
      })
      .catch((error) => {
        console.error("Edit failed:", error.response?.data || error.message);
        toast.error("Failed to update risk.");
      });
  };

  return (
    <Container>
      <ToastContainer />
      <Typography variant="h5" my={3}>
        All Risks
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Probability</TableCell>
            <TableCell>Impact</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {risks.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.project}</TableCell>
              <TableCell>{r.description}</TableCell>
              <TableCell>{r.probability}%</TableCell>
              <TableCell>{r.impact}</TableCell>
              <TableCell>
                <IconButton color="primary" onClick={() => openEditModal(r)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => deleteRisk(r.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Risk</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Project"
            name="project"
            value={currentRisk.project || ""}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={currentRisk.description || ""}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Probability"
            name="probability"
            type="number"
            value={currentRisk.probability || ""}
            onChange={handleEditChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Impact"
            name="impact"
            type="number"
            value={currentRisk.impact || ""}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={submitEdit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default RiskList;
