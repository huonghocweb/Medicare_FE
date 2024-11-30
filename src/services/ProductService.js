import axiosInstance from "../features/AxiosInstance";

const getAllProducts = async(paginationState) => {
    try {
        const response = await axiosInstance.get(`api/product/getAll`,{
            params : {
                pageCurrent : paginationState.pageCurrent,
                pageSize : paginationState.pageSize,
                sortOrder : paginationState.sortOrder,
                sortBy : paginationState.sortBy
            }
        });
        return response.data;
    } catch (error) {
        console.error('error in get All Products',error);
        throw error;
    }
}

const getProductById = async (productId) => {
    try {
        const response = await axiosInstance.get(`api/product/getById/${productId}`);
        return response.data;
    } catch (error) {
        console.error('error in get Prodcuct By Id',error);
    }
}

const createProduct = async (formData)=> {
    console.log(formData)
        try {
            const response = await axiosInstance.post(`/api/product`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
            return response.data;
        } catch (error) {
            console.error('error in create Product',error);
            throw error;
        }
}

const updateProduct = async (productId,formData) => {
    console.log(formData);
    try {
        const response = await axiosInstance.put(`/api/product/${productId}`,formData,{headers : {'Content-Type' : 'multipart/form-data'}});
        return response.data;
    } catch (error) {
        console.error('error in update Product',error);
        throw error;
    }
}


export {getAllProducts ,getProductById , createProduct , updateProduct};