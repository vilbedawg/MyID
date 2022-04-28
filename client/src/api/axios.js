import axios from "axios";
const baseURL = 'http://localhost:3000' ||  'https://oma-id.herokuapp.com';

export default axios.create({
    baseURL: baseURL
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});