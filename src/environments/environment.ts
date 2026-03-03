export const environment = {
  production: false,
  apiUrl: 'https://traffic-is-back.onrender.com/api',
  useMockData: false  // ← PROMENI NA false kada pokreneš backend
};

// src/environments/environment.prod.ts
export const environmentProd = {
  production: true,
  apiUrl: 'https://traffic-is-back.onrender.com/api',
  useMockData: false
};