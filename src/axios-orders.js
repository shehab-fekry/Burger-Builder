import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-e20fc-default-rtdb.firebaseio.com/'
});

export default instance;