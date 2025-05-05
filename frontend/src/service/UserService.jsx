import { httpClientUserSerivce } from "../config/AxiosHelper";

export const userLogin = async (loginDetails)=>{
    console.log(loginDetails);
    const response = await httpClientUserSerivce.post(`/user/login`, loginDetails, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}

export const userSignup = async (userDetails)=>{
    console.log(userDetails);
    const response = await httpClientUserSerivce.post(`/user/signup`, userDetails, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}


export const getUserById = async (userId) => {
    console.log(userId);
    const response = await httpClientUserSerivce.get(`/user/getUser/${userId}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return response.data;
}