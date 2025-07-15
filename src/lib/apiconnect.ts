import axios from 'axios';

const apiconnect = axios.create({
    baseURL: "http://172.16.1.67:8000/api/",
    headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
    },
});

export default apiconnect;