import axios from 'axios';

var HOST = "localhost" || "192.168.2.4";
var PORT = 3001;
var PORT_Command = 5000;

const commonApi = axios.create({
    baseURL: `http://${HOST}:${PORT}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

const managerApi = axios.create({
    baseURL: `http://${HOST}:${PORT}/api/manager`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
});


const tagsApi = axios.create({
    baseURL: `http://${HOST}:${PORT}/api/tags`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
});


const loggingApi = axios.create({
    baseURL: `http://${HOST}:${PORT}/api/logging`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
});

const commandApi = axios.create({
    baseURL: `http://${HOST}:${PORT_Command}`,
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
    fetchCompetition: (competition_index, callback, onRejected) =>
        managerApi
            .get(`/fetchCompetition/${competition_index}`)
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
    deleteUser:  (user_index, payload, callback, onRejected) =>
        managerApi
            .post(`/deleteUser/${user_index}`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    updateUser: (user_index, payload, callback, onRejected) =>
        managerApi
            .patch(`/updateUser/${user_index}`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    uploadUsers: (payload, callback, onRejected) => 
        managerApi
            .post("/uploadUsers", payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),


    addGate: (payload, callback, onRejected) => 
        managerApi
            .post("/addGate", payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    fetchGate : (gateIndex, payload, callback, onRejected) => 
        managerApi
            .post(`/fetchGate/${gateIndex}`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    fetchAllGate: (competition_index, callback, onRejected) => 
        managerApi
            .get(`/fetchAllGate/${competition_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    updateGate: (gate_index, payload, callback, onRejected) =>
        managerApi
            .patch(`/updateGate/${gate_index}`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    deleteGate: (gate_index, callback, onRejected) => 
        managerApi
            .delete(`/deleteGate/${gate_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    checkGateNo: (payload, callback, onRejected) => 
        managerApi
            .post(`/checkGateNo`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
    checkGateIP: (payload, callback, onRejected) => 
        managerApi
            .post(`/checkGateIP`, payload)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),
};

export const tags_backend = {
    fetchTags: (callback, onRejected) =>
        tagsApi
            .get('/fetchTags')
            .then(({data}) => callback({data}))
            .catch(({response}) => onRejected(response)),
    
    addTags: (payload, callback, onRejected) =>
        tagsApi
            .post('/addTags', payload)
            .then(({data}) => callback({data}))
            .catch(({response}) => onRejected(response)),
};

export const results_api = {
    fetchResult: (competition_index, callback, onRejected) =>
        loggingApi
            .get(`/fetchResult/${competition_index}`)
            .then(({data}) => callback({data}))
            .catch(({response}) => onRejected(response)),
    fetchResultDetail: (competition_index, user_index, callback, onRejected) =>
        loggingApi
            .get(`/fetchResultDetail/${competition_index}/user=${user_index}`)
            .then(({data}) => callback({data}))
            .catch(({response}) => onRejected(response)),
    exportCSV: (competition_index, callback, onRejected) => 
        loggingApi
            .get(`/exportResult/${competition_index}`)
            .then(({ data }) => callback({ data }))
            .catch(({ response }) => onRejected(response)),      
};

export const command_api = {
    command_start: (payload, callback, onRejected) => 
        commandApi
            .post('/start', payload)
            .then(({data}) => callback({data}))
            .catch(({response}) => onRejected(response)),
    command_end: (payload, callback, onRejected) => 
        commandApi
            .post('/start', payload)
            .then(({data}) => callback({data}))
            .catch(({response}) => onRejected(response)),
};