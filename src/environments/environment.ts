export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  useMockData: true  // ← PROMENI NA false kada pokreneš backend
};

// src/environments/environment.prod.ts
export const environmentProd = {
  production: true,
  apiUrl: 'https://your-production-url.com/api',
  useMockData: false
};