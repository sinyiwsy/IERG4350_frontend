import axios from 'axios';

import { baseURL } from './baseURL.json'

const apiWithCredentials = axios.create({
    baseURL: baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

export default apiWithCredentials;