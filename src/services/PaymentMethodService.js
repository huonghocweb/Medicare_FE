import axiosInstance from "../features/AxiosInstance";

const getAllPaymentMethod = async () => {
    try {
        const response = await axiosInstance.get(`/api/paymentMethod/getAll`);
        return response.data;
    } catch (error) {
        console.error('error in get All Payment Method',error);
        throw error;
    }
}
export {getAllPaymentMethod}