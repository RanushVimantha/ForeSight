// src/api/aiService.js
import axios from 'axios';

const aiAxios = axios.create({
  baseURL: 'http://127.0.0.1:5001', // Flask backend
});

export const getLatestRiskLevel = (projectId) => aiAxios.get(`/latest-risk/${projectId}`);
export const predictRisk = (input) => aiAxios.post('/predict-risk', input);
export const simulateRisk = (input) => aiAxios.post('/simulate-risk', input);
export const explainInstance = (input) => aiAxios.post('/explain-instance', input);
export const updateModel = (input) => aiAxios.post('/update-model', input);
export const generateMitigations = (risks) =>
  axios.post("http://127.0.0.1:5001/generate-mitigations", { risks });
