import axiosInstance from "../features/AxiosInstance";

const getAllOrder = async (pagination)=> {
    try {
        const response = await axiosInstance.get(`/api/order/getAll`,{
            params : {
                pageCurrent : pagination.pageCurrent,
                pageSize : pagination.pageSize , 
                sortOrder : pagination.sortOrder, 
                sortBy : pagination.sortBy
            }
        })
        return response.data;
    } catch (error) {
        console.error('error in get All Order',error);
        throw error;
    }
}

const getOrderById = async (orderId) => {
    try {
        const response = await axiosInstance.get(`/api/order/getById/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Order By Id', error);
        throw error;
    }
}

export {getAllOrder , getOrderById}