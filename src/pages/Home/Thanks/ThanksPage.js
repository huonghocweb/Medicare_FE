import React, { useEffect, useState, useRef } from 'react';
import Thanks from '../../../components/Home/Thanks/Thanks';
import { useParams } from 'react-router-dom';
import { getPaymentInfo } from '../../../services/PaymentService';
import OrderDetailsList from '../../../components/Admin/Order/OrderDetailsList';
import { getOrderById } from '../../../services/OrderService';
import './Thanks.css';

const ThanksPage = () => {
    const { paymentMethodId } = useParams();

    const [isPaymentSuccess, setIsPaymentSuccess] = useState(null);
    const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
    const [orderByOrderId, setOrderByOrderId] = useState(null);
    const [orderResponse,setOrderResponse] = useState();

    // Thêm cờ kiểm soát
    const isFetchCalled = useRef(false);

    useEffect(() => {
        const fetchGetPaymentInfo = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const response = await getPaymentInfo(paymentMethodId, urlParams);
                console.log(response.data);
                setOrderResponse(response.data);
                // Cập nhật trạng thái thanh toán
                if (response.data ) {
                    setIsPaymentSuccess(true);
                } else {
                    setIsPaymentSuccess(false);
                }
            } catch (error) {
                console.error('Error in fetchGetPaymentInfo:', error);
            }
        };

        // Gọi hàm fetch chỉ một lần
        if (paymentMethodId && !isFetchCalled.current) {
            isFetchCalled.current = true;
            fetchGetPaymentInfo();
        }
    }, [paymentMethodId]); // Dependency vẫn giữ nguyên để kiểm tra `paymentMethodId`.

    const handleOpenOrderDetailsPopup = () => {
        setIsOpenOrderDetails(!isOpenOrderDetails);
    };

    const handleGetOrderByOrderId = async (orderId) => {
        console.log(orderId)
        try {
            const response = await getOrderById(orderId);
            console.log(response.data);
            setOrderByOrderId(response.data);
            handleOpenOrderDetailsPopup();
        } catch (error) {
            console.error('Error in handleGetOrderByOrderId:', error);
        }
    };

    return (
        <>
            <Thanks
                isPaymentSuccess={isPaymentSuccess}
                orderResponse = {orderResponse}
                handleGetOrderByOrderId={handleGetOrderByOrderId}
            />
            <OrderDetailsList
                isOpenOrderDetails={isOpenOrderDetails}
                handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}
                orderByOrderId={orderByOrderId}
            />
        </>
    );
};

export default ThanksPage;
