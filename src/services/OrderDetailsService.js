import axiosInstance from "../features/AxiosInstance";

const getOrderDetailsByOrderId = async (orderId) => {
    try {
        const response= await axiosInstance.get(`/api/orderDetails/getByOrderId/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Order Details BY Order Id', error);
        throw error;
    }
}


export {getOrderDetailsByOrderId}