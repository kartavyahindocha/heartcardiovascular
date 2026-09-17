// API Base Configuration
// In unified Render deployment or local Vite proxy, API_BASE_URL defaults to "" (same-origin)
// In split frontend/backend deployments, set VITE_API_BASE_URL to backend URL (e.g., https://cardiohealth-backend.onrender.com)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
