import React from 'react';
import MyCouponList from '../../MyAccount/MyCoupon/MyCouponList';
import './CouponStoragePopup.css';

const CouponStoragePopup = ({isOpenCouponStorage , handleOpenCouponStorage , couponStorageByUserId , handelCheckCoupon}) => {
    return (
        <>
            {
                isOpenCouponStorage && (
                    <div className='couponStorage-overlay'>
                        <div className='couponStorage-popup'>
                            <MyCouponList
                                couponStorageByUserId = {couponStorageByUserId}
                                handelCheckCoupon = {handelCheckCoupon}
                            />
                            <button className='btn btn-primary' onClick={handleOpenCouponStorage}>Cloes</button>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default CouponStoragePopup;