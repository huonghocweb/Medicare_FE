import axiosInstance from "../features/AxiosInstance";

const getAllCategory = async () => {
    try {
        const response = await axiosInstance.get(`api/category/getAll`);
        return response.data ;
    } catch (error) {
        console.error('errorin in get All Category',error);
         throw error;
    }
}

export {getAllCategory}