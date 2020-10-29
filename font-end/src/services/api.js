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
            .catch(({ response }) => onRejected(response)),
    deleteCompetition: (competition_index, callback, onRejected) =>
        managerApi
            .delete(`/deleteCompetition/${competition_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),



    addUser: (payload, callback, onRejected) => 
        managerApi
            .post("/addUser", payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    fetchAllUser: (competition_index, callback, onRejected) => 
        managerApi
            .get(`/fetchAllUser/${competition_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    fetchUser: (user_index, callback, onRejected) => 
        managerApi
            .get(`/fetchUser/${user_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    deleteUser:  (user_index, callback, onRejected) =>
        managerApi
            .delete(`/deleteUser/${user_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    updateUser: (user_index, payload, callback, onRejected) =>
        managerApi
            .patch(`/updateUser/${user_index}`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
}
