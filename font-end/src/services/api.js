import axios from 'axios';

const commonApi = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        "Content-Type": "application/json",
    },
});

const managerApi = axios.create({
    baseURL: 'http://localhost:3001/api/manager',
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
});

export const authentication = {
    Login: (payload, callback, onRejected) => 
        commonApi
            .post("/auth/login", payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response))
};

export const manager = {
    addCompetition: (payload, callback, onRejected) => 
        managerApi
            .post("/addCompetition", payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    fetchAllCompetition: (callback, onRejected) => 
        managerApi
            .get("/fetchAllCompetition")
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response))
}