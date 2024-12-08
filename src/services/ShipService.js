import axiosInstance from "../features/AxiosInstance";

const getProvinces = async () => {
    try {
        const response =  await axiosInstance.post(`/api/ship/getProvince`);
        return response;
    } catch (error) {
        console.error('error in get Provinces', error);
        throw error;
    }
}

const getDistrictByProvinceId = async (provinceId) => {
    try {
        const response = await axiosInstance.post(`/api/ship/getDistrict/${provinceId}`);
        return response;        
    } catch (error) {
        console.error('error in getDistrictByProvinceId ', error);
        throw error;
    }
}

const getWardByDistrictId = async (districtId) => {
    try {
        const response = await axiosInstance.post(`/api/ship/getWard/${districtId}`);
        return response;
    } catch (error) {
        console.error('error in get Ward By District Id',error);
    }
}

const getShipService = async (districtId) => {
    try {
        const response = await axiosInstance.post(`/api/ship/getShipService/${districtId}`)
        return response;
    } catch (error) {
        console.error('error in get Ship Service',error);
    }
}

const getFee = async (districtId, serviceId,wardCode) => {
    console.log(districtId);
    console.log(serviceId);
    console.log(wardCode);
    try {
        const response = await axiosInstance.post(`/api/ship/getFee/${districtId}/${serviceId}/${wardCode}`);
        return response;
    } catch (error) {
        console.error('error in get Feee',error);
        throw error;
    }
}

export {getProvinces,getDistrictByProvinceId,getShipService,getWardByDistrictId , getFee};