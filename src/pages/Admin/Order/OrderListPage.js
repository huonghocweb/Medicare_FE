import React, { useEffect, useState } from 'react';
import { getAllOrder, getOrderById } from '../../../services/OrderService';
import OrderList from '../../../components/Admin/Order/OrderList';
import OrderDetailsList from '../../../components/Admin/Order/OrderDetailsList';
import { getOrderDetailsByOrderId } from '../../../services/OrderDetailsService';

const OrderListPage = () => {

    const [orders,setOrders] = useState([]);
    const [isOpenOrderDetails,setIsOpenOrderDetails] = useState(null);
    const [orderByOrderId,setOrderByOrderId] = useState([]);


    const [paginationState ,setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'orderId',
        totalPage : ''
    })

    const hanldeChangePaginationState = (name, value) => {
        setPaginationState(prev => ({
                ...prev, 
                [name] : value
        }))
    }

    const sortOptions = [
        {label : 'Order Id' , value : 'orderId'},
        {label : 'User ' , value : 'user'},
        {label : 'Total Price' , value : 'totalPrice'},
        {label : 'Total Quantity' , value : 'totalQuantity'},
    ]

    const fetchAllOrder = async () => {
        try {
            const response =await getAllOrder(paginationState);
            console.log(response);
            setOrders(response.data.content);
            hanldeChangePaginationState('totalPage',response.data.totalPages);
        } catch (error) {
            console.error('error in fetch All Order',error);
        }
    }

    const handleGetOrderByOrderId = async (orderId) => {
        try {
            const response = await getOrderById(orderId);
            console.log(response.data);
            setOrderByOrderId(response.data);
            handleOpenOrderDetailsPopup();
        } catch (error) {
            console.error('error in ', error);
        }
    }

    const handleOpenOrderDetailsPopup = async () => {
        setIsOpenOrderDetails(!isOpenOrderDetails);
    }
    useEffect(() => {
        fetchAllOrder();
    },[...Object.values(paginationState)])
    return (
        <>
            <OrderList
            orders = {orders}
            paginationState = {paginationState}
            hanldeChangePaginationState = {hanldeChangePaginationState}
            sortOptions = {sortOptions}
            handleGetOrderByOrderId = {handleGetOrderByOrderId}
             />
             <OrderDetailsList
                isOpenOrderDetails = {isOpenOrderDetails}
                handleOpenOrderDetailsPopup = {handleOpenOrderDetailsPopup}
                orderByOrderId = {orderByOrderId}
             />
        </>
    );
};

export default OrderListPage;