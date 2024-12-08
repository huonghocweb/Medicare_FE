import React, { useEffect, useState } from 'react';
import CouponForm from '../../../components/Admin/Coupon/CouponForm';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { createCoupon, getCouponById, updateCoupon } from '../../../services/CouponService';
import CustomAlert from '../../../components/Include/CustomAlert';

const CouponFormPage = () => {

    const {couponId} = useParams();
    const {register, reset , handleSubmit, formState : {errors}} = useForm();
    const [imageCoupon,setImageCoupon] = useState();
    const [files,setFiles] = useState([]);
    const [alert ,setAlert] = useState(null);
    const navigate = useNavigate();

    const submitCoupon = async (payload) => {
        let resCoupon;
        console.log(payload);
        const formData = new FormData();
        if(files.length > 0){
            for(const file of files){
                formData.append('files',file);
            }
        }
        formData.append('couponRequest', new Blob([JSON.stringify(payload)] ,{type : 'application/json'}));
        try {
            if(couponId){
                resCoupon = await updateCoupon(couponId,formData);
                if(resCoupon.data.data !== null){
                    setAlert({type : 'success', message : 'Update Coupon Success' });
                }else {
                    setAlert({type : 'error', message : 'Update Coupon Failed' });
                }
            }else {
                resCoupon = await createCoupon(formData);
                if(resCoupon.data.data !== null){
                    setAlert({type : 'success', message : 'Create Coupon Success' });
                }else {
                    setAlert({type : 'error', message : 'Create Coupon Failed' });
                }
            }
            if(resCoupon.data.data !== null){
                setTimeout(()=> {
                    navigate(`/admin/coupons`)
                }, 3000);
            }
        } catch (error) {
            console.error('error in submit Coupon',error);
        }
    }

    const handleChangeFile = (e) => {
        const selectedFiles = Array.from(e.target.files); // Chuyển thành mảng
        if (selectedFiles.length > 0) {
            const imageUrl = URL.createObjectURL(selectedFiles[0]); // Chỉ lấy file đầu tiên để hiển thị
            console.log(imageUrl);
            setFiles(selectedFiles); // Lưu danh sách file
            setImageCoupon(imageUrl); // Hiển thị hình ảnh
        }
    };
    

    const fetchCouponById = async()=> {
        try {
            const resCouponById = await getCouponById(couponId);
            console.log(resCouponById.data.data);
            const couponByIdData = resCouponById.data.data;
            reset ({
                couponId : couponByIdData.couponId,
                code : couponByIdData.code , 
                startDate : couponByIdData.startDate,
                endDate : couponByIdData.endDate,
                maxDiscountAmount : couponByIdData.maxDiscountAmount,
                useLimit : couponByIdData.useLimit,
                usedCount : couponByIdData.usedCount,
                description: couponByIdData.description,
                discountPercent : couponByIdData.discountPercent
            })
            setImageCoupon(couponByIdData.imageUrl);
        } catch (error) {
            console.error('error in fetch Coupon By Id',error);
        }
    }

    useEffect(() => {
        if(couponId){
            fetchCouponById();
        }
    },[])
    return (
        <>
            {
                alert && (
                    <CustomAlert
                type={alert.type}
                message={alert.message}
                onClose={() => setAlert(null)}
                    />
                )
            }
            <CouponForm
                couponId={couponId}
                register={register}
                handleSubmit={handleSubmit}
                submitCoupon={submitCoupon}
                handleChangeFile = {handleChangeFile}
                imageCoupon={imageCoupon}
                errors ={errors}
            />
        </>
    );
};

export default CouponFormPage;