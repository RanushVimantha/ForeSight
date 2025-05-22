import axios from './axiosInstance';

export const getSummary = () => axios.get('/dashboard/summary');
export const getKPIs = () => axios.get('/dashboard/kpis');
export const getOpenRisks = () => axios.get('/dashboard/open-risks');
