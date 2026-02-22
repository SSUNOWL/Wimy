import axios from 'axios';

// 환경 변수에서 베이스 URL을 가져옵니다.
// npm run dev 시에는 .env.development를, npm run build 시에는 .env.production을 참조합니다.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;