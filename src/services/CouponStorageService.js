import axiosInstance from "../features/AxiosInstance";

const getCouponStorageByUserId = async (userId, paginationState) => {
    try {
        const response = await axiosInstance.get(`/api/couponStorage/${userId}`,{
            params : {
                pageCurrent : paginationState.pageCurrent,
                pageSize : paginationState.pageSize ,
                sortOrder : paginationState.sortOrder,
                sortBy : paginationState.sortBy
            }
        })
        return response;
    } catch (error) {
        console.error('error in get Coupon Storage by UserId',error);
        throw error;
    }
}

const createCouponStorage = async (userId, code) =>{
    console.log(userId);
    try {
        const response = await axiosInstance.get(`/api/couponStorage/addCouponToStorage/${userId}`,{
            params : {
                code : code
            }
        }
        );
        return response;
    } catch (error) {
        console.error('error in createCouponStorage',error);
    }
}

const deleteCouponInCouponStorage = async (couponStorageId) => {
    try {
        const response = await axiosInstance.delete(`/api/${couponStorageId}`);
        return response;
    } catch (error) {
        console.error('error in deleteCouponInCouponStorage',error);
        throw error;
    }
}

export {getCouponStorageByUserId , createCouponStorage , deleteCouponInCouponStorage}