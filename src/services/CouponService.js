import axiosInstance from "../features/AxiosInstance";

const getAllCoupon  = async (paginationState) => {
    console.log(paginationState);
    try {
        const response = await axiosInstance.get(`/api/coupon`, {
            params : {
                pageCurrent : paginationState.pageCurrent,
                pageSize : paginationState.pageSize,
                sortOrder : paginationState.sortOrder,
                sortBy : paginationState.sortBy
            }
        })
        return response;
    } catch (error) {
        console.error('error in get All Coupon',error);
        throw error;
    }
}

const getCouponById = async (couponId) => {
    try {
        const response = await axiosInstance.get(`/api/coupon/${couponId}`);
        return response;
    } catch (error) {
        console.error('error in Get Coupon By Id',error);
        throw error;
    }
}

const createCoupon = async (formData) => {
    console.log(formData);
    try {
        const response = await axiosInstance.post(`/api/coupon`,formData , 
            {headers: {'Content-Type' : 'multipart/form-data'}} );
        return response;
    } catch (error) {
        console.error('error in create Coupon',error);
        throw error;
    }
}

const updateCoupon = async (couponId, formData) => {
    try {
        const response = await axiosInstance.put(`/api/coupon/${couponId}`,formData,
            {headers: {'Content-Type' : 'multipart/form-data'}}
        )
        return response;
    } catch (error) {
        console.error('error in update Coupon',error);
        throw error;
    }
}

const deleteCoupon = async (couponId) => {
    try {
        const response = await axiosInstance.delete(`/api/coupon/${couponId}`);
        return response;
    } catch (error) {
        console.error('error in delete Coupon',error);
        throw error;
    }
}

const checkCoupon = async (code) => {
    try {
        const response = await axiosInstance.get(`/api/coupon/checkCoupon/${code}`);
        return response;
    } catch (error) {
        console.error('error in check coupon',error);
    }
}


export {checkCoupon,createCoupon,updateCoupon,getAllCoupon,getCouponById,deleteCoupon}