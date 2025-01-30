import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const path = axios.create({
    baseURL: 'http://localhost:7000/api',
    responseType: 'json',
    withCredentials: true,
})

path.interceptors.request.use(
    async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
},
    (error) => {
    return Promise.reject(error);
}

);


export default path;