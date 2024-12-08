import React, { useEffect, useState } from 'react';
import { getAllCoupon } from '../../../services/CouponService';
import CouponList from '../../../components/Admin/Coupon/CouponList';

const CouponListPage = () => {
    
    const [coupons,setCoupons] = useState([]);
    const [paginationState,setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4, 
        sortOrder : 'asc', 
        sortBy : 'couponId',
        totalPage : ''
    })
    
    const handleChangePaginationState = (name, value) => {
        setPaginationState((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    const sortOptions = [
        {label : 'Coupon ID', value : 'couponId' } , 
        {label : 'Start Date', value : 'startDate' } , 
        {label : 'End Date ', value : 'endDate' } , 
    ]

    const fetchAllCoupon = async () => {
        try {
            const resCoupons = await getAllCoupon(paginationState);
            console.log(resCoupons.data.data);
            setCoupons(resCoupons.data.data.content);
            handleChangePaginationState('totalPage',resCoupons.data.data.totalPages);
            handleChangePaginationState('pageCurrent', resCoupons.data.data.pageable.pageNumber);
        } catch (error) {
            console.error('error in fetch AllCoupon',error);
        }
    }
    useEffect(() => {
        fetchAllCoupon();
    },[...Object.values(paginationState)])
    return (
        <>
            <CouponList 
                coupons={coupons}
                paginationState={paginationState}
                handleChangePaginationState={handleChangePaginationState}
                sortOptions={sortOptions}
            />
        </>
    );
};

export default CouponListPage;