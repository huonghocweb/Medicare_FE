import axiosInstance from '../features/AxiosInstance';

const getAllOrderStatus = async () => {
    try {
        const response = await axiosInstance.get(`/api/orderStatus/getAll`);
        return response.data;
    } catch (error) {
        console.error('error in get All Order Staus',error);
        throw error;
    }
}

export {getAllOrderStatus}