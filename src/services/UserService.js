import axiosInstance from "../features/AxiosInstance";
import { getToken } from "./AuthService";
import { jwtDecode } from 'jwt-decode';

const getAllUser = async (paginationState) => {
    try {
        const response = await axiosInstance.get(`/api/user/getAll`, {
            params : {
                pageCurrent : paginationState.pageCurrent,
                pageSize : paginationState.pageSize, 
                sortOrder : paginationState.sortOrder,
                sortBy : paginationState.sortBy
            }
        })
        return response.data;
    } catch (error) {
        console.error('error in get All User',error);
        throw error;
    }
}

const getUserById = async (userId) => {
    try {
        const response = await axiosInstance.get(`/api/user/getById/${userId}`);
        return response.data;
    } catch (error) {
        console.error('error in get All User',error);
        throw error;
    }
}

const getUserByToken = async() => {
    const jwtToken = jwtDecode(getToken());
    const userName = jwtToken.sub;
    try {
        const response = await axiosInstance.get(`/api/user/getByUserName/${userName}`);
        if(response.data.data !== null){
            return response.data;
        }else {
            return null;
        }
      
    } catch (error) {
        console.error('error in get user By Token', error);
        throw error;
    }
}

const createUser = async (formData) => {
    try {
        const response = await axiosInstance.post(`/api/user`, formData , {headers : {'Content-Type' : 'multipart/form-data'}});
        return response.data;
    } catch (error) {
        console.error('error in get All User',error);
        throw error;
    }
}

const updateUser = async (userId, formData) => {
    try {
        const response = await axiosInstance.put(`/api/user/${userId}`,formData, {headers: {'Content-Type' : 'multipart/form-data'}});
        return response.data;
    } catch (error) {
        console.error('error in get All User',error);
        throw error;
    }
}

export {getAllUser,getUserById, createUser,updateUser , getUserByToken};