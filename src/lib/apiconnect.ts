import axios from 'axios';

const apiconnect = axios.create({
    baseURL: `${process.env.EXPO_PUBLIC_SERVER_API}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "Application/json",
    },
});

export default apiconnect;