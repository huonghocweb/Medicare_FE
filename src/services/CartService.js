import axiosInstance from "../features/AxiosInstance";

const getCartByUserId = async(userId) => {
    console.log(userId)
    try {
        const response = await axiosInstance.get(`/api/cart/getByUserId/${userId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Cart By UserId',error);
        throw error;
    }
}

const addItemToCart = async (userId,formData) => {
    try {
        const response = await axiosInstance.post(`/api/cart/addToCart/${userId}`,formData , {headers : {'Content-Type' : 'multipart form-data'}});
        return response.data;
    } catch (error) {
        console.error('error in add Item To Cart',error);
        throw error;
    }
}

export {getCartByUserId,addItemToCart}