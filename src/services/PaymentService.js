import axiosInstance from "../features/AxiosInstance";


const paymentRequest = async (userId, paymentMethodId , formData ) => {
    try {
        const response = await axiosInstance.post(`/api/payment/${userId}/${paymentMethodId}`, formData ,{headers : {'Content-Type' : 'multipart/form-data'}});
        return response.data;
    } catch (error) {
        console.error('error in payment Request' , error);
        throw error;
    }
}

const getPaymentInfo = async (paymentMethod , urlParams) => {
    const controller = new AbortController();
    const params = Object.fromEntries(urlParams.entries());
    try {
        const response = await axiosInstance.get(`/api/payment/getPaymentInfo/${paymentMethod}`, {
            params ,
            signal : controller.signal
        })
        return response.data;
    } catch (error) {
        console.error('error in get Payment Info', error);
        throw error;
    }
}

export {paymentRequest , getPaymentInfo}