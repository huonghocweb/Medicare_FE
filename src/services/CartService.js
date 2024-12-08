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

const addCouponToCart = async (userId, code) => {
    console.log(userId);
    console.log(code);
    try {
        const response = await axiosInstance.get(`/api/cart/addCouponToCart/${userId}`,
            {
                params : {
                    code : code
                }
            }
        )
        return response;
    } catch (error) {
        console.error('error in Add Coupon To Cart',error);
        throw error;
    }
}

const removeCouponToCart = async (userId, code) => {
    console.log(userId);
    console.log(code);
    try {
        const response = await axiosInstance.get(`/api/cart/removeCouponToCart/${userId}`,
            {
                params : {
                    code : code
                }
            }
        )
        return response;
    } catch (error) {
        console.error('error in Add Coupon To Cart',error);
        throw error;
    }
}

export {getCartByUserId,addItemToCart , addCouponToCart , removeCouponToCart}