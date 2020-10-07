import axios from 'axios';

const instance = axios.create({
    baseURL : "https://backend-tinder-react.herokuapp.com",
    //baseURL : "http://localhost:8001",
    withCredentials : true,
});

export default instance;
