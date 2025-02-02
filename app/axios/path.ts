// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const path = axios.create({
    baseURL: 'http://192.168.1.193:7000/api/',
})
path.interceptors.request.use(
    async (config) => {
        // console.log('config', config);
        // const token = await AsyncStorage.getItem('token');

        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }

        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }

        return config;
    },
    function (err) {
        console.error("Axios Request Error:", err);
        return Promise.reject(err);
    }
);


export default path;