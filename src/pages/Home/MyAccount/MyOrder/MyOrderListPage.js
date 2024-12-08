import React, { useEffect, useState } from 'react';
import { getAllOrderStatus } from '../../../../services/OrderStatusService';
import { useParams } from 'react-router-dom';
import MyOrderList from '../../../../components/Home/MyAccount/MyOrder/MyOrderList';
import { getMyOrderByStatusId, getOrderById, updateOrderStatusByAcion } from '../../../../services/OrderService';
import OrderDetailsList from '../../../../components/Admin/Order/OrderDetailsList';

const MyOrderListPage = () => {

    const {userId} = useParams();
    const [orderStatus,setOrderStatus] = useState([]);
    const [myOrders,setMyOrders] = useState([]);
    const [isOpenOrderDetails,setIsOpenOrderDetails] = useState(false);
    const [orderByOrderId,setOrderByOrderId] = useState();

    const [paginationState,setPaginationState] = useState({
        pageCurrent : 0, 
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'orderId',
        totalPage : '' , 
        statusIdSelected : 0
    })

    const handleChangePaginationState = (name,value) => {
        setPaginationState(prev => ({
            ...prev ,
            [name] : value
        }))
    }
    const sortOptions = [
        {label : 'Order ID', value :'orderId'},
        {label : 'Total Price ', value :'totalPrice'},
        {label : 'Payment Date Time ', value :'paymentDatetime'}
    ]

    const fetchAllOrderStatus = async () => {
        try {
            const response = await getAllOrderStatus();
            console.log(response.data);
            setOrderStatus(response.data);
        } catch (error) {
            console.error('error in fetch All Order Status',error);
        }
    }

    const fetchOrdersByUserId= async () => {
        try {
            const response = await getMyOrderByStatusId(userId,paginationState);
            console.log(response.data);
            if(response.data ){
                handleChangePaginationState('totalPage',response.data.totalPages);
                handleChangePaginationState('pageCurrent', response.data.pageable.pageNumber);
                setMyOrders(response.data.content);
            }else {
                setMyOrders(null);
            }
        } catch (error) {
            console.error('error in fetchOrdersByUserId',error);
        }
    }

    const handleOpenOrderDetailsPopup = async () => {
       setIsOpenOrderDetails(!isOpenOrderDetails);
    }

    const handleGetOrderByOrderId = async (orderId) => {
        console.log(orderId);
        try {
            const response = await getOrderById(orderId);
            console.log(response.data);
            setOrderByOrderId(response.data);
            handleOpenOrderDetailsPopup();
        } catch (error) {
            console.error('error in handle Return Request',error);
        }
    }

    const handleUpdateOrderStatusByAciont = async (orderId,actionStatus) => {
        try {
            const response = await updateOrderStatusByAcion(orderId, actionStatus);
            return response.data;
        } catch (error) {
            console.error('error in handleUpdateOrderStatusByAciont',error);
        }
    }
      

    useEffect(() => {
        fetchOrdersByUserId();
        fetchAllOrderStatus();
    },[...Object.values(paginationState)  ])
    return (
        <>
            <MyOrderList
                myOrders = {myOrders}
                orderStatus = {orderStatus}
                paginationState = {paginationState}
                handleChangePaginationState = {handleChangePaginationState}
                sortOptions = {sortOptions}
                handleGetOrderByOrderId= {handleGetOrderByOrderId}
                handleUpdateOrderStatusByAciont = {handleUpdateOrderStatusByAciont}
            />
            <OrderDetailsList
                isOpenOrderDetails={isOpenOrderDetails}
                handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}
                orderByOrderId={orderByOrderId}
            />
        </>
    );
};

export default MyOrderListPage;