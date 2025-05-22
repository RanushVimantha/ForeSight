// src/api/aiService.js
import axios from './axiosInstance';

const AI_API = 'http://127.0.0.1:5001';     // Python AI backend
const NODE_API = 'http://localhost:5000';   // Express backend

export const predictRisk = (input) => axios.post(`${AI_API}/predict-risk`, input);
export const simulateRisk = (input) => axios.post(`${AI_API}/simulate-risk`, input);
export const explainInstance = (input) => axios.post(`${AI_API}/explain-instance`, input);
export const getLatestRiskLevel = (projectId) => axios.get(`${AI_API}/latest-risk/${projectId}`);

export const generateMitigations = (risks) => axios.post(`${AI_API}/generate-mitigations`, { risks });

// ✅ NEW: Save mitigations
export const saveMitigations = (projectId, risks, mitigations) =>
  axios.post(`${NODE_API}/api/mitigations/save`, {
    projectId,
    risks,
    mitigations
  });

// ✅ NEW: Fetch saved mitigations
export const fetchMitigations = (projectId) =>
  axios.get(`${NODE_API}/api/mitigations/${projectId}`);
