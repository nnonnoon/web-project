import axios from 'axios';

const commonApi = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        "Content-Type": "application/json",
    },
});

export const authentication = {
    Login: (payload, callback, onRejected) => 
        commonApi
            .post("/auth/login", payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response))
};