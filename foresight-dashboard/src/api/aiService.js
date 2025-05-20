// src/api/aiService.js
import axios from './axiosInstance';

const API_BASE = 'http://127.0.0.1:5001'; // update if deployed

export const predictRisk = (input) => axios.post(`${API_BASE}/predict-risk`, input);
export const simulateRisk = (input) => axios.post(`${API_BASE}/simulate-risk`, input);
export const explainInstance = (input) => axios.post(`${API_BASE}/explain-instance`, input);
