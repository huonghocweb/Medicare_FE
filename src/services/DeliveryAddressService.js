import axiosInstance from "../features/AxiosInstance";

const getDeliveryAddressByUserId = async (paginationState, userId) => {
    try {
        const response = await axiosInstance.get(`/api/deliveryAddress/getByUserId/${userId}`,{
            params : {
                pageCurrent : paginationState.pageCurrent,
                pageSize : paginationState.pageSize,
                sortOrder : paginationState.sortOrder,
                sortBy : paginationState.sortBy
            }
        });
        return response.data;
    } catch (error) {
        console.error('error in getDeliveryAddressByUserId',error);
        throw error;
    }
}

const getDeliveryAddressById = async (deliveryAddressId) => {
    try {
        const response = await axiosInstance.get(`/api/deliveryAddress/getById/${deliveryAddressId}`);
        return response.data;
    } catch (error) {
        console.error('error in getDeliveryAddressById',error);
        throw error;
    }
}

const createDeliveryAddress = async (params) => {
    try {
        const response = await axiosInstance.post(`/api/deliveryAddress`,params,
            {headers: {'Content-Type' : 'multipart/form-data'}});
        return response.data;
    } catch (error) {
        console.error('error in createDeliveryAddress',error);
        throw error;
    }
}

const updateDeliveryAddress = async (deliveryAddressId, params) =>{
    try {
        const response = await axiosInstance.put(`/api/deliveryAddress/${deliveryAddressId}`,params , 
            {headers : {'Content-Type' : 'multipart/form-data'}}
        );
        return response.data;
    } catch (error) {
        console.error('error in updateDeliveryAddress',error);
        throw error;
    }
}

const removeDeliveryAddress = async (deliveryAddressId )=> {
    try {
        const response = await axiosInstance.delete(`/api/deliveryAddress/${deliveryAddressId}`);
        return response.data;
    } catch (error) {
        console.error('error in removeDeliveryAddress',error);
    }
}

export {getDeliveryAddressById,getDeliveryAddressByUserId,createDeliveryAddress,updateDeliveryAddress,removeDeliveryAddress}