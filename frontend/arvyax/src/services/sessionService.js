 
import axios from 'axios';
const API_URL = 'http://localhost:5000/api/sessions/';
const getMySessions = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const config = {
    headers: {
      'x-auth-token': token,
    },
  };
    return axios.get(API_URL + 'my-sessions', config);  
}
const createSession = async (sessionData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const config = {
        headers: {
            'x-auth-token': token,
        },
    };
    return axios.post(API_URL + 'save-draft', sessionData, config);
}
const getConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { 'x-auth-token': token },
    };
};

const getSessionById = (sessionId) => {
    return axios.get(API_URL + `my-sessions/${sessionId}`, getConfig());
};

const publishSession = async (sessionId) => {
   const token=localStorage.getItem('token');
   if (!token) {
       throw new Error('No token found');
   }
    const config = {
        headers: {
            'x-auth-token': token,
        },
    };
    return axios.post(API_URL + 'publish', { sessionId }, config);
}
const getPublicSessions = async () => {
    return axios.get(API_URL);
}
const sessionService = {
  getMySessions,
  createSession,
  publishSession,
    getPublicSessions,
    getSessionById,
};

export default sessionService;
