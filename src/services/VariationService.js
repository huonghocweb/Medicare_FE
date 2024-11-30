import axiosInstance from "../features/AxiosInstance";


const getVariationById = async (variationId) => {
    try {
        const response = await axiosInstance.get(`/api/variation/getById/${variationId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Variation By Id', error);
        throw error;
    }
}

const getVariationsByDosageFormId = async (productId, dosageFormId) => {
    try {
        const response = await axiosInstance.get(`/api/variation/getByDosageFormId/${productId}/${dosageFormId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Variation By Id', error);
        throw error;
    }
}

const getVariationsByPackagingId = async (productId,packagingId) => {
    try {
        const response = await axiosInstance.get(`/api/variation/getByPackagingId/${productId}/${packagingId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Variation By Id', error);
        throw error;
    }
}

const getVariationByDosageFormIdAndPackagingId = async (productId,dosageFormId, packagingId) => {
    try {
        const response = await axiosInstance.get(`/api/variation/getByDosageFormIdAndPackagingId/${productId}/${dosageFormId}/${packagingId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Variation By Id', error);
        throw error;
    }
}

export {getVariationByDosageFormIdAndPackagingId,getVariationById,getVariationsByDosageFormId,getVariationsByPackagingId}