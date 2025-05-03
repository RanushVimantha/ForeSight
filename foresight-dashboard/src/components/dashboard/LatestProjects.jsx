import React, { useState, useEffect } from 'react';
import {
    Paper, Typography, List, ListItem, ListItemAvatar,
    Avatar, ListItemText, Chip, Skeleton, Box
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';

const projects = [
    { name: 'Fraud Detection AI', status: 'On-Going' },
    { name: 'Supply Chain Optimizer', status: 'On-Going' },
    { name: 'Customer Churn Predictor', status: 'Completed' },
    { name: 'Credit Risk Analyzer', status: 'Pending' },
    { name: 'AI Chatbot', status: 'On-Going' },
];

const LatestProjects = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Paper
            sx={{
                p: 3,
                borderRadius: 3,
                height: '100%',
                backgroundColor: '#fafafa',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
        >
            <Typography variant="subtitle1" gutterBottom>
                Latest 5 Projects
            </Typography>
            <Box sx={{ maxHeight: 300, overflowY: 'auto', pr: 1 }}>
                <List dense>
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                              <ListItem key={index} sx={{ mb: 1 }}>
                                  <Skeleton variant="circular" width={40} height={40} />
                                  <Skeleton variant="text" width="60%" sx={{ ml: 2 }} />
                              </ListItem>
                          ))
                        : projects.map((project, index) => (
                              <ListItem
                                  key={index}
                                  disablePadding
                                  sx={{ mb: 1, alignItems: 'center' }}
                              >
                                  <ListItemAvatar>
                                      <Avatar sx={{ bgcolor: '#1976d2' }}>
                                          <FolderIcon />
                                      </Avatar>
                                  </ListItemAvatar>
                                  <ListItemText primary={project.name} />
                                  <Chip
                                      label={project.status}
                                      size="small"
                                      color={
                                          project.status === 'Completed'
                                              ? 'success'
                                              : project.status === 'Pending'
                                              ? 'warning'
                                              : 'primary'
                                      }
                                  />
                              </ListItem>
                          ))}
                </List>
            </Box>
        </Paper>
    );
};

export default LatestProjects;
