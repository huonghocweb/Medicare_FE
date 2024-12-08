import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MyDeliveryAddressList from "../../../../components/Home/MyAccount/MyDeliveryAddress/MyDeliveryAddressList";
import CustomAlert from "../../../../components/Include/CustomAlert";
import AddressFormPopup from "../../../../components/Home/MyAccount/MyDeliveryAddress/AddressFormPopup";
import { createDeliveryAddress, getDeliveryAddressById, getDeliveryAddressByUserId, removeDeliveryAddress, updateDeliveryAddress } from "../../../../services/DeliveryAddressService";
import { getDistrictByProvinceId, getProvinces, getWardByDistrictId } from "../../../../services/ShipService";

const MyDeliveryAddressPage = () => {
  const [isOpenAddressPopup, setIsOpenAddressPopup] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [alert, setAlert] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const { userId } = useParams();
  const [dataEdit, setDataEdit] = useState();
  const [paginationState, setPaginationState] = useState({
    pageCurrent: 0,
    pageSize: 4,
    sortOrder: "desc",
    sortBy: "deliveryAddressId",
    totalPage: "",
  });
  const handlePaginationChange = async (name, value) => {
    setPaginationState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDeliveryAddressForm = async (data) => {
    console.log(data);
    const userId = localStorage.getItem("userIdLogin");
    const provinceChoosed = provinces.find(
      (item) => item.ProvinceID === Number(data.provinceId)
    );
    const districtChoosed = districts.find(
      (item) => item.DistrictID === Number(data.districtId)
    );
    const wardChoosed = wards.find((item) => item.WardCode === data.wardCode);
    const fullAddress = `${data.houseNumber} ${wardChoosed?.WardName} ${districtChoosed?.DistrictName} - ${provinceChoosed?.ProvinceName}`;
    console.log(fullAddress);
    const formData = new FormData();
    const payload = {
      ...data,
      userId,
      fullAddress: fullAddress,
    };
    formData.append(
      "deliveryAddressRequest",
      new Blob([JSON.stringify(payload)], { type: "application/json" })
    );
    try {
      let resCreateDeliveryAddress;
      if (dataEdit) {
        resCreateDeliveryAddress = await updateDeliveryAddress(dataEdit.deliveryAddressId, formData);
        if (resCreateDeliveryAddress.data !== null) {
          setAlert({
            type: "success",
            message: "Create Delivery Address Success !",
          });
        } else {
          setAlert({
            type: "error",
            message: "Create Delivery Addres Failed!",
          });
        }
      } else {
        resCreateDeliveryAddress = await createDeliveryAddress(formData);
        if (resCreateDeliveryAddress.data !== null) {
          setAlert({
            type: "success",
            message: "Create  Delivery Address Success !",
          });
        } else {
          setAlert({
            type: "error",
            message: "Update Delivery Addres Failed!",
          });
        }
      }
      handleCloesPopup();
      fetchDeliveryAddress();
    } catch (error) {
      console.error("error in handleDeliveryAddressForm", error);
    }
  };

  const handleDeleteDeliveryAddress = async (deliveryAddressId) => {
    try {
      const resDeleteDeliveryAddressById = await removeDeliveryAddress(deliveryAddressId);
      if (resDeleteDeliveryAddressById.data.data !== null) {
        setAlert({
          type: "success",
          message: "Delete  Delivery Address Success !",
        });
      } else {
        setAlert({ type: "error", message: "Delete Delivery Addres Failed!" });
      }
      fetchDeliveryAddress();
    } catch (error) {
      console.error("error in handleDeleteDeliveryAddress ", error);
    }
  };
  const fetchDeliveryAddress = async () => {
    try {
      const resDeliveryAddressByUserId = await getDeliveryAddressByUserId(paginationState,userId)
      console.log(resDeliveryAddressByUserId.data.content);
      setDeliveryAddress(resDeliveryAddressByUserId.data.content);
      handlePaginationChange(
        "totalPage",
        resDeliveryAddressByUserId.data.totalPages
      );
    } catch (error) {
      console.error("error in fetch DeliveryAddress", error);
    }
  };
  const handleCloesPopup = () => {
    setIsOpenAddressPopup(false);
    reset({
      deliveryAddressName: "",
      phoneAddress: "",
      provinceId: "",
      districtId: "",
      wardCode: "",
      fullAddress: "",
      houseNumber: "",
    });
    setDataEdit(null);
  };
  const fetchDeliveryAddressById = async (deliveryAddressId) => {
    setIsOpenAddressPopup(true);
    try {
      const resDeliveryAddressById = await getDeliveryAddressById(deliveryAddressId);
      const deliveryAddressByIdData = resDeliveryAddressById.data;
      console.log(deliveryAddressByIdData.provinceId);
      await handleGetDistrictByProvinceId(deliveryAddressByIdData.provinceId);
      await handleGetWardByDistrictId(deliveryAddressByIdData.districtId);
      setDataEdit(deliveryAddressByIdData);
      resetFormValue(deliveryAddressByIdData);
    } catch (error) {
      console.log("error in fetchDeliveryAddressById ", error);
    }
  };

  const resetFormValue = (deliveryAddressByIdData) => {
    reset({
      deliveryAddressId: deliveryAddressByIdData.deliveryAddressId,
      deliveryAddressName: deliveryAddressByIdData.deliveryAddressName,
      provinceId: deliveryAddressByIdData.provinceId,
      districtId: deliveryAddressByIdData.districtId,
      wardCode: deliveryAddressByIdData.wardCode,
      houseNumber: deliveryAddressByIdData.houseNumber,
      phoneAddress: deliveryAddressByIdData.phoneAddress,
      fullAddress: deliveryAddressByIdData.fullAddress,
      status: deliveryAddressByIdData.status,
    });
  };
  const fetchProvinces = async () => {
    try {
      const resProvinces = await getProvinces();
      const provinceData = JSON.parse(resProvinces.data.data);
      console.log(resProvinces.data);
      setProvinces(provinceData.data);
    } catch (error) {
      console.error("error in fetch Provices", error);
    }
  };
  const handleGetDistrictByProvinceId = async (provinceId) => {
    console.log(provinceId);
    try {
      const resDistrictsByProvince = await getDistrictByProvinceId(provinceId);
      const districtsData = JSON.parse(resDistrictsByProvince.data.data);
      setDistricts(districtsData.data);
    } catch (error) {
      console.error("error in handleGetDistrictByProvinceId", error);
    }
  };

  const handleGetWardByDistrictId = async (districtId) => {
    try {
      const resWardByDistrict = await getWardByDistrictId(districtId);
      const wardsData = JSON.parse(resWardByDistrict.data.data);
      setWards(wardsData.data);
    } catch (error) {
      console.error("error in handleGetWardByDistrictId ", error);
    }
  };
  const sortOptions = [
    { value: "deliveryAddressId", label: "DeliveryAddress Id" },
    { value: "deliveryAddressName", label: "DeliveryAddress Name" },
    { value: "provinceId", label: "Province " },
    { value: "status", label: "Status" },
  ];
  useEffect(() => {
    fetchDeliveryAddress();
    fetchProvinces();
  }, [...Object.values(paginationState), districts, wards]);
  return (
    <>
      {alert && (
        <CustomAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <MyDeliveryAddressList
        deliveryAddress={deliveryAddress}
        setIsOpenAddressPopup={setIsOpenAddressPopup}
        paginationState={paginationState}
        handlePaginationChange={handlePaginationChange}
        sortOptions={sortOptions}
        fetchDeliveryAddressById={fetchDeliveryAddressById}
        handleDeleteDeliveryAddress={handleDeleteDeliveryAddress}
      />
      <AddressFormPopup
        isOpenAddressPopup={isOpenAddressPopup}
        handleCloesPopup={handleCloesPopup}
        handleDeliveryAddressForm={handleDeliveryAddressForm}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        provinces={provinces}
        districts={districts}
        wards={wards}
        handleGetDistrictByProvinceId={handleGetDistrictByProvinceId}
        handleGetWardByDistrictId={handleGetWardByDistrictId}
        dataEdit={dataEdit}
      />
    </>
  );
};

export default MyDeliveryAddressPage;
