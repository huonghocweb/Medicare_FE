import React, { useEffect, useState } from 'react';
import Checkout from '../../../components/Home/Cart/Checkout/Checkout';
import { useParams } from 'react-router-dom';
import NavBar from '../../../components/Home/Index/NavBar';
import { getAllPaymentMethod } from '../../../services/PaymentMethodService';
import { getCartByUserId } from '../../../services/CartService';
import { getUserById } from '../../../services/UserService';
import { useForm } from 'react-hook-form';
import { paymentRequest } from '../../../services/PaymentService';
import DeliveryAddressPopup from '../../../components/Home/Cart/Checkout/DeliveryAddressPopup';
import { getDeliveryAddressById, getDeliveryAddressByUserId } from '../../../services/DeliveryAddressService';
import { getDistrictByProvinceId, getFee, getProvinces, getShipService, getWardByDistrictId } from '../../../services/ShipService';

const CheckoutPage = () => {
    
    const {userId} = useParams();
    const {handleSubmit, reset,register , formState : {error}} = useForm();
    const [cartByUserId,setCartByUserId] =useState();
    const [userByUserId,setUserByUserId] = useState();
    const [paymentMethods,setPaymentMethods] = useState([]);
    const [deliveryByUserId,setDeliveryByUserId] = useState([]);
    const baseReturnUrl = window.location.origin;
    const [isOpenDelivery,setIsOpentDelivery] = useState(false);
 

    const [paginationState, setPaginationState] = useState({
        pageCurrent: 0,
        pageSize: 4,
        sortOrder: "desc",
        sortBy: "deliveryAddressId",
        totalPage: "",
      });

    const [addressState,setAddressState] = useState({
        provinceData : [], 
        districtData : [], 
        wardData : [],  
        shipServiceData : [],
        provinceChoosed : [], 
        districtChoosed : [], 
        wardChoosed : [],
        shipServiceChoosed : '',
        houseNumber : '',
        shipFee : '', 
        leadTime : '',
        fullAddress : ''
    })

    const handleChangeAddressDataState = (name, value) => {
        setAddressState((prev) => (
            {
                ...prev ,
                [name] : value
            }
        )
    )
    }

    const fetchProvinces = async () => {
        try {
            const resProvinces = await getProvinces();      
            const parsedData = JSON.parse(resProvinces.data.data);
            handleChangeAddressDataState('provinceData',parsedData.data);
        } catch (error) {
            console.error('error in fetch Provinces',error);
        }
    }

    const hanldeDistrictByProvinceId = async (provinceId) => {
        console.log(provinceId);
        handleChangeAddressDataState('provinceChoosed',addressState.provinceData.find(item => item.ProvinceID === Number(provinceId)));
        try {
            const resDistricts = await getDistrictByProvinceId(provinceId);
            const parseDitricts = JSON.parse(resDistricts.data.data);
            console.log(parseDitricts.data);
            handleChangeAddressDataState('districtData',parseDitricts.data);
        } catch (error) {
            console.error('erorr in getDistrictByProvinceId',error);
        }
    }
    const hanldeWardByDistrictId = async (districtId) => {
        console.log(districtId);
        console.log(addressState.districtData);
        await handleChangeAddressDataState('districtChoosed',addressState.districtData.find(item => item.DistrictID === Number(districtId)));
        try {
            const resWards = await getWardByDistrictId(districtId);
            const parseWards = JSON.parse(resWards.data.data);
            console.log(parseWards.data);
            handleChangeAddressDataState('wardData',parseWards.data);
            handleGetShipService(districtId);
        } catch (error) {
            console.error('error in getWardByDistrictId',error);
        }
    }

    const handleGetShipService = async (districtId) => {
        console.log(addressState.districtChoosed);
        try {
            const resShipService = await getShipService(districtId);
            const parseShipService = JSON.parse(resShipService.data.data);
            handleChangeAddressDataState('shipServiceData',parseShipService.data);
        } catch (error) {
            console.error('error in handle Get Ship Service',error);
        }
    }

    const handleGetFee = async(service_type_id) => {
        console.log(addressState);
        handleChangeAddressDataState('shipServiceChoosed',addressState.shipServiceData.find(item => item.service_type_id === Number(service_type_id)));
        try {
            const resFee = await getFee(addressState.districtChoosed.DistrictID,service_type_id,addressState.wardChoosed.WardCode);
            console.log(resFee.data.data.leadTimeData);
            const parseFee = JSON.parse(resFee.data.data.feeData);
            console.log(parseFee.data);
            handleChangeAddressDataState('leadTime',resFee.data.data.leadTimeData);
            handleChangeAddressDataState('shipFee' , parseFee.data.service_fee);
        } catch (error) {
            console.error('error in handle Get Fee',error);
        }
    }

    const handleGetDeliveryById = async (deliveryAddressId) => {
        try {
            const resDeliveryById = await getDeliveryAddressById(deliveryAddressId);
            const deliveryData = resDeliveryById.data;
    
            if (deliveryData) {
                const provinces = JSON.parse( (await getProvinces()).data.data).data;
                console.log(provinces);
                const provincesChoosed = provinces.find(item => item.ProvinceID === Number(deliveryData.provinceId));

                const districts = JSON.parse( (await getDistrictByProvinceId(deliveryData.provinceId)).data.data).data;
                const districtChoosed = districts.find(item => item.DistrictID === Number(deliveryData.districtId))
                console.log(districts);
                
                const wards = JSON.parse((await getWardByDistrictId(deliveryData.districtId)).data.data).data;
                const wardChoosed = wards.find(item => item.WardCode === deliveryData.wardCode);
                console.log(wards);

                const shipServices = JSON.parse((await getShipService(deliveryData.districtId)).data.data).data;
                setAddressState((prev) => ({
                    ...prev,
                    provinceData : provinces,
                    districtData : districts,
                    wardData : wards,
                    provinceChoosed : provincesChoosed,
                    districtChoosed : districtChoosed,
                    wardChoosed : wardChoosed,
                    shipServiceData : shipServices,
                    houseNumber: deliveryData.houseNumber,
                    fullAddress: deliveryData.fullAddress,
                    shipFee :'',
                    leadTime : ''
                }));
            }
        } catch (error) {
            console.error('Error in handleGetDeliveryById:', error);
        }
    };
    

    const handleAddressData = async() => {
        try {
            const fullAddress = addressState.houseNumber + ' ' + addressState.wardChoosed.WardName + ' ' +
               addressState.districtChoosed.DistrictName + ' - ' +addressState.provinceChoosed.ProvinceName;
               console.log(fullAddress);
               console.log(addressState.shipFee);
               console.log(addressState.leadTime);
               handleChangeAddressDataState('fullAddress',fullAddress);
               handleOpenDelivery();
        } catch (error) {
            console.error('error in handle address Data',error);
        }
    }

    const handleOpenDelivery = () => {
        fetchProvinces();
        setIsOpentDelivery(!isOpenDelivery);
    }
    const fetchAllPaymentMethod = async () => {
        try {
            const resonse = await getAllPaymentMethod();
            setPaymentMethods(resonse.data);
        } catch (error) {
            console.error('error in fetch All Payment Method',error);
        }
    }

    const fetchCartByUserId = async() => {
        try {
            const resonse = await getCartByUserId(userId);
            console.log(resonse.data);
            setCartByUserId(resonse.data);
        } catch (error) {
            console.error('error in fetch cart By User Id');
        }
    }
    const fetchUserByUserId = async() => {
        try {
            const response = await getUserById(userId);
            setUserByUserId(response.data);
        } catch (error) {
            console.error('error i fetch User By UserId', error);
        }
    }

    const handlePaymentRequest = async ( paymentMethodId, totalPrice) => {
        const formData = new FormData();
     
        formData.append('baseReturnUrl',baseReturnUrl);
        formData.append('totalPrice', new Blob([JSON.stringify(totalPrice)] , {type : 'application/json'}));
        formData.append('deliveryAddress', addressState.fullAddress);
        formData.append('shipFee',  new Blob([JSON.stringify(addressState.shipFee)] , {type : 'application/json'}));
        formData.append('leadTime',new Blob([JSON.stringify(addressState.leadTime)] , {type : 'application/json'} ));
       console.log(totalPrice);
        console.log(addressState);
        console.log(baseReturnUrl);
        console.log(totalPrice);
        console.log(paymentMethodId);
        try {
          const response = await paymentRequest(userId,paymentMethodId,formData);
          console.log(response.data);
          if(response.data !== null){
            window.location.href  = response.data;
          }
        } catch (error) {
            console.error('error i handle Payment Request',error);
        }
    }

    const fetchDeliveryByUserId = async () => {
        try {
            const resDeliveryByUserId = await getDeliveryAddressByUserId(paginationState, userId );
            setDeliveryByUserId(resDeliveryByUserId.data.content);
        } catch (error) {
            console.error('error in fetch Delivery By User Id',error);
        }
    }

    useEffect(() => {
        if(userId ) {
            fetchDeliveryByUserId();
            fetchCartByUserId();
            fetchUserByUserId();
        }
        fetchAllPaymentMethod();
        console.log(addressState);
    },[...Object.values(paginationState), ...Object.values(addressState)])
    return (
        <>
            <NavBar/>
            <Checkout 
            cartByUserId = {cartByUserId}
            paymentMethods = {paymentMethods}
            userByUserId = {userByUserId}
            handlePaymentRequest = {handlePaymentRequest}
            handleOpenDelivery= {handleOpenDelivery}
            addressState = {addressState}
            />
            <DeliveryAddressPopup
                isOpenDelivery={isOpenDelivery}
                handleOpenDelivery={handleOpenDelivery}
                deliveryByUserId= {deliveryByUserId}
                addressState = {addressState}
                handleChangeAddressDataState = {handleChangeAddressDataState}
                hanldeDistrictByProvinceId= {hanldeDistrictByProvinceId}
                hanldeWardByDistrictId = {hanldeWardByDistrictId}
                handleGetFee = {handleGetFee}
                handleAddressData ={handleAddressData}
                handleGetDeliveryById= {handleGetDeliveryById}
             />
        </>
    );
};

export default CheckoutPage;