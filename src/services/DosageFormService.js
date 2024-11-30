import axiosInstance from "../features/AxiosInstance";

const getAllDosageForm = async () => {
    try {
        const response = await axiosInstance.get(`/api/dosageForm/getAll`);
        return response.data;
    } catch (error) {
        console.error('error in getAll DosageForm',error);
        throw error;
    }
}


const getDosageFormById = async (dosageFormId) => {
    try {
        const response = await axiosInstance.get(`/api/dosageForm/getById/${dosageFormId}`);
        return response.data;
    } catch (error) {
        console.error('error in get DosagForm',error);
        throw error;
    }
}

const getDosagesFormByProductId = async (productId) => {
    try {
        const response = await axiosInstance.get(`/api/dosageForm/getByProductId/${productId}`);
        return response.data;
    } catch (error) {
         console.error('error in  getDosagesFormByProductId',error);
        throw error;
    }
}
export {getAllDosageForm, getDosageFormById , getDosagesFormByProductId};