import axios from "axios";

// Instance unique d'Axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 secondes max
});

// Intercepteur : Ajoute le token automatiquement s'il existe
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Ou via un Context/Redux
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Intercepteur de réponse (optionnel) : Gestion globale des erreurs (401, 403...)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Non autorisé !");
    }
    return Promise.reject(error);
  },
);

export default apiClient;
