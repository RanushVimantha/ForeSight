import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { getLatestRiskLevel, generateMitigations } from '../api/aiService';
import {
  Box, Typography, Card, CardContent, Button, CircularProgress, Divider, Chip, TextField,
  MenuItem, Table, TableHead, TableRow, TableCell, TableBody, IconButton, List, ListItem,
  ListItemIcon, ListItemText
} from '@mui/material';
import { toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ScienceIcon from '@mui/icons-material/Science';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SecurityIcon from '@mui/icons-material/Security';
import SearchIcon from '@mui/icons-material/Search';
import InsightsIcon from '@mui/icons-material/Insights';
import AIRiskInsights from '../components/dashboard/AIRiskInsights';
import UpdateRiskModelForm from '../components/dashboard/UpdateRiskModelForm';

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedProject, setEditedProject] = useState({});
  const [risks, setRisks] = useState([]);
  const [newRisk, setNewRisk] = useState({ title: '', category: '', probability: 3, impact: 3 });
  const [latestRiskLevel, setLatestRiskLevel] = useState(null);
  const [mitigations, setMitigations] = useState([]);

  const likelihoodLabels = ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'];
  const impactLabels = ['Negligible', 'Minor', 'Moderate', 'Major', 'Severe'];

  const fetchProject = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/projects/${id}`);
      setProject(res.data);
      setEditedProject(res.data);
    } catch {
      toast.error('Failed to load project details');
    }
    setLoading(false);
  };

  const fetchRisks = async () => {
    try {
      const res = await axiosInstance.get('/risks');
      const projectRisks = res.data.filter(r => r.project_id == id);
      setRisks(projectRisks);

      // Fetch AI mitigations for project risks
      if (projectRisks.length > 0) {
        const response = await generateMitigations(projectRisks);
        setMitigations(response.data.mitigations || []);
      }
    } catch {
      toast.error('Failed to load risks');
    }
  };

  const fetchLatestRiskLevel = async () => {
    try {
      const res = await getLatestRiskLevel(id);
      setLatestRiskLevel(res.data.risk_level);
    } catch (error) {
      console.error("❌ Failed to load latest risk level", error);
    }
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => {
    setEditMode(false);
    setEditedProject(project);
  };

  const handleSave = async () => {
    try {
      const { name, description, status, duration_days, team_size, budget_lkr, scope_description } = editedProject;
      await axiosInstance.put(`/projects/${id}`, { name, description, status, duration_days, team_size, budget_lkr, scope_description });
      toast.success('Project updated');
      setEditMode(false);
      fetchProject();
    } catch {
      toast.error('Failed to update project');
    }
  };

  const handleChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  const handleToggleRiskStatus = async (riskId, status) => {
    const newStatus = status === 'Open' ? 'Closed' : 'Open';
    await axiosInstance.put(`/risks/${riskId}`, { status: newStatus });
    fetchRisks();
  };

  const handleDeleteRisk = async (riskId) => {
    if (window.confirm('Delete this risk?')) {
      await axiosInstance.delete(`/risks/${riskId}`);
      fetchRisks();
    }
  };

  const handleCreateRisk = async () => {
    if (!newRisk.title || !newRisk.category) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      await axiosInstance.post('/risks', {
        ...newRisk,
        project_id: id
      });
      toast.success('Risk created');
      setNewRisk({ title: '', category: '', probability: 3, impact: 3 });
      fetchRisks();
    } catch {
      toast.error('Failed to create risk');
    }
  };

  useEffect(() => {
    fetchProject();
    fetchRisks();
    const delayFetch = setTimeout(() => {
      fetchLatestRiskLevel();
    }, 800);
    return () => clearTimeout(delayFetch);
  }, [id]);

  if (loading) return <Box display="flex" justifyContent="center"><CircularProgress /></Box>;
  if (!project) return <Typography>Project not found</Typography>;

  const getCellColor = (prob, impact) => {
    const score = prob * impact;
    return score >= 20 ? '#f28b82' :
      score >= 12 ? '#fbbc04' :
        score >= 6 ? '#fff475' :
          '#ccff90';
  };

  return (
    <Box>
      <Button onClick={() => navigate('/projects')} sx={{ mb: 2 }}>← Back to Projects</Button>
      <Typography variant="h4" gutterBottom display="flex" alignItems="center">
        <AssignmentIcon sx={{ mr: 1 }} /> Project Details
      </Typography>

      {/* Project Info + Matrix */}
      <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }} alignItems="flex-start">

        {/* Project Info */}
        <Card sx={{ maxWidth: 900, padding: 3, boxShadow: 4, borderRadius: 3, position: 'relative', flex: 1 }}>
          <CardContent>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<ScienceIcon />}
              sx={{ position: 'absolute', top: 16, right: 16 }}
              onClick={() => window.open(
                `http://localhost:8501?projectId=${project.id}&projectName=${encodeURIComponent(project.name)}`,
                '_blank'
              )}
            >
              Analyze Risks
            </Button>

            <Typography variant="h6"><InfoIcon /> ID: {project.id}</Typography>
            <Divider sx={{ my: 2 }} />

            {['name', 'description', 'duration_days', 'team_size', 'budget_lkr', 'scope_description'].map(field => (
              <Box mb={2} key={field}>
                {editMode ? (
                  <TextField
                    name={field}
                    value={editedProject[field] || ''}
                    onChange={handleChange}
                    fullWidth
                    multiline={field === 'description' || field === 'scope_description'}
                    label={field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    type={['duration_days', 'team_size', 'budget_lkr'].includes(field) ? 'number' : 'text'}
                  />
                ) : (
                  <Typography><strong>{field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</strong> {project[field]}</Typography>
                )}
              </Box>
            ))}

            <Box mb={2} display="flex" gap={3} alignItems="center" flexWrap="wrap">
              <Box display="flex" alignItems="center" gap={1}>
                <Typography><strong>Status:</strong></Typography>
                <Chip label={project.status} />
              </Box>

              {latestRiskLevel !== null && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography><strong>Risk Outcome:</strong></Typography>
                  <Chip
                    label={latestRiskLevel}
                    color={
                      latestRiskLevel === 'High'
                        ? 'error'
                        : latestRiskLevel === 'Medium'
                          ? 'warning'
                          : 'success'
                    }
                  />
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />
            <Typography variant="body2">Created: {new Date(project.createdAt).toLocaleString()}</Typography>
            <Typography variant="body2">Updated: {new Date(project.updatedAt).toLocaleString()}</Typography>

            <Divider sx={{ my: 2 }} />
            {editMode ? (
              <Box display="flex" gap={2}>
                <Button startIcon={<SaveIcon />} onClick={handleSave}>Save</Button>
                <Button startIcon={<CloseIcon />} onClick={handleCancel}>Cancel</Button>
              </Box>
            ) : (
              <Button startIcon={<EditIcon />} onClick={handleEdit}>Edit</Button>
            )}
          </CardContent>
        </Card>

        {/* Risk Matrix */}
        <Card sx={{ padding: 2, borderRadius: 3, width: '100%', maxWidth: 600 }}>
          <Typography variant="h6" align="center" mb={2}>
            5x5 Risk Matrix
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns="repeat(6, 1fr)"
            gap={1}
            alignItems="center"
            sx={{ border: '2px solid #ccc', borderRadius: 2 }}
          >
            <Box></Box>
            {impactLabels.map(lbl => (
              <Box key={lbl} textAlign="center" fontWeight="bold" sx={{ padding: '8px', backgroundColor: '#f0f0f0' }}>
                {lbl}
              </Box>
            ))}
            {[5, 4, 3, 2, 1].map(prob => (
              <React.Fragment key={prob}>
                <Box fontWeight="bold" display="flex" justifyContent="center" alignItems="center" sx={{ backgroundColor: '#f0f0f0' }}>
                  {likelihoodLabels[5 - prob]}
                </Box>
                {[1, 2, 3, 4, 5].map(impact => (
                  <Box key={`p${prob}i${impact}`} sx={{
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: getCellColor(prob, impact),
                    borderRadius: 1,
                    fontWeight: 'bold'
                  }}>
                    {risks.filter(r => r.probability === prob && r.impact === impact).map(r => `#${r.id}`).join(', ') || '-'}
                  </Box>
                ))}
              </React.Fragment>
            ))}
          </Box>
        </Card>
      </Box>

      {/* Insights & Mitigations */}
      <Box mt={5} display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3}>
        <Card sx={{ flex: 1, backgroundColor: '#f9f9f9' }}>
          <AIRiskInsights project={project} />
        </Card>
        <Card sx={{ flex: 1, backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Typography variant="h5">🤖 AI-Suggested Mitigations</Typography>
            <List dense>
              {mitigations.length > 0 ? mitigations.map((m, i) => (
                <ListItem key={i}><ListItemIcon><InsightsIcon /></ListItemIcon><ListItemText primary={m} /></ListItem>
              )) : (
                <Typography variant="body2" color="text.secondary">No mitigations available.</Typography>
              )}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4}>
        {project && <UpdateRiskModelForm project={project} />}
      </Box>

      {/* Risk Table */}
      <Box mt={5}>
        <Typography variant="h5">Linked Risks</Typography>
        {risks.length === 0 ? <Typography>No risks yet.</Typography> : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Probability</TableCell>
                <TableCell>Impact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {risks.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.category}</TableCell>
                  <TableCell>{r.probability}</TableCell>
                  <TableCell>{r.impact}</TableCell>
                  <TableCell><Chip label={r.status} /></TableCell>
                  <TableCell>
                    <Button onClick={() => handleToggleRiskStatus(r.id, r.status)} size="small">Toggle Status</Button>
                    <IconButton color="error" onClick={() => handleDeleteRisk(r.id)}><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Box mt={3}>
          <Typography variant="h6">Add New Risk to This Project</Typography>
          <Box display="flex" gap={2} flexWrap="wrap" mt={1}>
            <TextField label="Title" value={newRisk.title} onChange={e => setNewRisk({ ...newRisk, title: e.target.value })} />
            <TextField label="Category" value={newRisk.category} onChange={e => setNewRisk({ ...newRisk, category: e.target.value })} />
            <TextField select label="Probability" value={newRisk.probability} onChange={e => setNewRisk({ ...newRisk, probability: parseInt(e.target.value) })}>
              {[1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
            <TextField select label="Impact" value={newRisk.impact} onChange={e => setNewRisk({ ...newRisk, impact: parseInt(e.target.value) })}>
              {[1, 2, 3, 4, 5].map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </TextField>
            <Button variant="contained" onClick={handleCreateRisk}>Create Risk</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ProjectDetailsPage;
