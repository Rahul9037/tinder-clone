import axios from 'axios';

const instance = axios.create({
    baseURL : "https://backend-tinder-react.herokuapp.com",
});

export default instance;
