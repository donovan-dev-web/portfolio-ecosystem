// src/services/ProjectService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProjects = async () => {
  const res = await axios.get(`${API_URL}/projects`);
  return res.data;
};

export const getProjectById = async (id: string) => {
  const res = await axios.get(`${API_URL}/projects/${id}`);
  return res.data;
};

export const getTechnologies = async () => {
  const res = await axios.get(`${API_URL}/technologies`);
  return res.data;
};

export const getLanguages = async () => {
  const res = await axios.get(`${API_URL}/languages`);
  return res.data;
};

export const getProjectTypes = async () => {
  const res = await axios.get(`${API_URL}/project-types`);
  return res.data;
};
