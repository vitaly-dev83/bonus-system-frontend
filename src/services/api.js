import axios from 'axios';

// Базовый URL для API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const api = {
  // Получить KPI за месяц
  getKpi: async (month) => {
    const response = await fetch(`${API_BASE_URL}/kpi?month=${month}`);
    if (!response.ok) throw new Error('Failed to fetch KPI');
    return response.json();
  },
  
  // Сохранить KPI
  saveKpi: async (data) => {
    const response = await fetch(`${API_BASE_URL}/kpi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to save KPI');
    return response.json();
  },
  
  // Получить расчет премии
  calculateBonus: async (data) => {
    const response = await fetch(`${API_BASE_URL}/bonus/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to calculate bonus');
    return response.json();
  },
};