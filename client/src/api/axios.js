import axios from "axios";
const baseURL = process.env.REACT_APP_NODE_API === "production" ? 'https://oma-id.herokuapp.com' : 'http://localhost:3000';

export default axios.create({
    baseURL: baseURL
});

export const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});