import axios from "axios";

const API_URL = 'http://localhost:8080/';
export const bsApi = axios.create({
    baseURL: API_URL,
});