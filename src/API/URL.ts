import axios from 'axios';

export const BASE_URL = window.location.origin.includes('local')
  ? 'http://localhost:5000/'
  : 'https://ts-academy-elian-cheng.onrender.com/';

// export const BASE_URL = 'https://ts-academy.up.railway.app/';
axios.defaults.baseURL = BASE_URL;
