import axiosInstance from "../features/AxiosInstance";


const getAllPackaging = async() => {
    try {
        const response = await axiosInstance.get(`/api/packaging/getAll`);
        return response.data;
    } catch (error) {
        console.error('error in get All Packaging',error);
        throw error;
    }
}

const getPackagingById = async (packagingId)=> {
    try {
        const response = await axiosInstance.get(`/api/packaging/getById/${packagingId}`);
        return response.data;
    } catch (error) {
        console.error('error in getPackagingById',error);
        throw error;
    }
}

const getPackagingsByProductId = async (productId) =>{
    try {
        const response = await axiosInstance.get(`/api/packaging/getByProductId/${productId}`);
        return response.data;
    } catch (error) {
        console.error('error in get PackagingsByProductId',error);
        throw error;
    }
}

export {getAllPackaging,getPackagingById , getPackagingsByProductId}