import axiosInstance from "../features/AxiosInstance";

const getAllRole = async () => {
    try {
        const response = await axiosInstance.get(`/api/role/getAll`);
        return response.data;
    } catch (error) {
        console.error('error in get AllRole ',error);
        throw error;
    }
}


const getRoleById = async (roleId) => {
    try {
        const response = await axiosInstance.get(`/api/role/getById`);
        return response.data;
    } catch (error) {
        console.error('error in getRoleById ',error);
        throw error;
    }
}

export {getAllRole,getRoleById};