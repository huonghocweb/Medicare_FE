import React, { useEffect, useRef, useState } from 'react';
import MyCouponList from '../../../../components/Home/MyAccount/MyCoupon/MyCouponList';
import { createCouponStorage, getCouponStorageByUserId } from '../../../../services/CouponStorageService';
import { useNavigate, useParams } from 'react-router-dom';
import CustomAlert from '../../../../components/Include/CustomAlert';

const MyCouponListPage = () => {

    const {userId} = useParams();
    const [couponStorageByUserId , setCouponStorageByUserId] = useState([]);
    const [alert,setAlert] = useState(null);
    const navigate = useNavigate();
    const codeInputRef = useRef();
    const [paginationState, setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'couponStorageId', 
        totalPage : ''
    })

    const handleChangePaginationState = async (name,value) => {
        setPaginationState(prev => ({
            ...prev ,
            [name] : value
        }))
    }
    const sortOptions = [
        {label : 'Coupon Storage Id', value : 'couponStorageId'},
        {label : 'Coupon Storage Id', value : 'couponStorageId'},
        {label : 'Coupon Storage Id', value : 'couponStorageId'}
    ]

    const fetchCouponStorageByUserId = async() => {
        try {
            const resCouponStorageByUserId = await getCouponStorageByUserId(userId, paginationState);
            console.log(resCouponStorageByUserId.data.data);
            handleChangePaginationState('totalPage', resCouponStorageByUserId.data.data.totalPages);
            setCouponStorageByUserId(resCouponStorageByUserId.data.data.content);
        } catch (error) {
            console.error('error in fetchCouponStorageByUserId',error);
        }
    }

    const handleAddCouponToStorage = async () => {
        console.log(codeInputRef.current.value);
        try {
            const resAddCouponToStorage = await createCouponStorage(userId,codeInputRef.current.value);
            console.log(resAddCouponToStorage.data.data);
            if(resAddCouponToStorage.data.data !== null){
                setAlert({type : 'success', message : 'Add Coupon To Storage Success!'});
            } else{
                setAlert({type : 'error', message : 'Add Coupon To Storage Failed!'});
            }
            fetchCouponStorageByUserId();
        } catch (error) {
            console.error('error in handleAddCouponToStorage',error);
        }
    }
    useEffect(() => {
        if(userId){
            fetchCouponStorageByUserId();
        }
    },[])
    return (
        <>
            {
                alert && (
                    <CustomAlert 
                        type ={alert.type}
                        message={alert.message}
                        onClose={() => setAlert(null)}
                    />
                )
            }
           <MyCouponList
            couponStorageByUserId = {couponStorageByUserId}
            handleAddCouponToStorage = {handleAddCouponToStorage}
            codeInputRef = {codeInputRef}
           /> 
        </>
    );
};

export default MyCouponListPage;