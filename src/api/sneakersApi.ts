import axios from 'axios';

export const sneakersApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
