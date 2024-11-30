import axios from "axios";

const login= async(userName, password) => {
    try {
        console.log(userName, password);
        const response = await axios.post(`http://localhost:8080/api/authenticate`, {userName, password});
        return response.data;
    } catch (error) {
        console.error('error in login',error);
        throw error;
    }
}

const getToken  = ()=> {
    return localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
}

export {login ,getToken}