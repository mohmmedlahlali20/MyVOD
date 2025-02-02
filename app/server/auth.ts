import path from "../axios/path";

const login = async (
    {
        email, 
        password
    }:
    {
        email:string, 
        password:string
    }
) => {
    try {
        const res = await path.post('/auth/login', {email, password});
        return res.data;
    } catch (error) {
        throw error;
    }
}

const register = async (
    {
        firstname,
        lastname, 
        email, 
        password
    }:
    {
        firstname:string, 
        lastname:string, 
        email:string, 
        password:string
    }
) => {
    try {
        const res = await path.post('auth/register', {firstname, lastname, email, password});
        return res.data;
    } catch (error) {
        throw error;
    }
}


export default {
    login,
    register
}