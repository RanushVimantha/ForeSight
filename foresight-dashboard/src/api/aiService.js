import axios from 'axios';

const API_BASE = 'http://localhost:5000'; // your Flask port

export const predictRisk = async (inputData) => {
  const res = await axios.post(`${API_BASE}/predict-risk`, inputData);
  return res.data;
};

export const simulateRisk = async (inputData) => {
  const res = await axios.post(`${API_BASE}/simulate-risk`, inputData);
  return res.data;
};

export const explainInstance = async (inputData) => {
  const res = await axios.post(`${API_BASE}/explain-instance`, inputData);
  return res.data;
};
