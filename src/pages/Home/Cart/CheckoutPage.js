import React, { useEffect, useState } from 'react';
import Checkout from '../../../components/Home/Cart/Checkout';
import { useParams } from 'react-router-dom';
import NavBar from '../../../components/Home/Index/NavBar';
import { getAllPaymentMethod } from '../../../services/PaymentMethodService';
import { getCartByUserId } from '../../../services/CartService';
import { getUserById } from '../../../services/UserService';
import { useForm } from 'react-hook-form';
import { paymentRequest } from '../../../services/PaymentService';

const CheckoutPage = () => {
    
    const {userId} = useParams();
    const {handleSubmit, reset,register , formState : {error}} = useForm();
    const [cartByUserId,setCartByUserId] =useState();
    const [userByUserId,setUserByUserId] = useState();
    const [paymentMethods,setPaymentMethods] = useState([]);
    const baseReturnUrl = window.location.origin;
    const fetchAllPaymentMethod = async () => {
        try {
            const resonse = await getAllPaymentMethod();
            console.log(resonse.data);
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
            console.log(response.data);
            setUserByUserId(response.data);
        } catch (error) {
            console.error('error i fetch User By UserId', error);
        }
    }

    const handlePaymentRequest = async ( paymentMethodId, totalPrice) => {
        const formData = new FormData();
        formData.append('baseReturnUrl',baseReturnUrl);
        formData.append('totalPrice', new Blob([JSON.stringify(totalPrice)] , {type : 'application/json'} ));
        console.log(userByUserId.userId);
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
    useEffect(() => {
        if(userId ) {
            fetchCartByUserId();
            fetchUserByUserId();
        }
        fetchAllPaymentMethod();
    },[])
    return (
        <>
            <NavBar/>
            <Checkout 
            cartByUserId = {cartByUserId}
            paymentMethods = {paymentMethods}
            userByUserId = {userByUserId}
            handlePaymentRequest = {handlePaymentRequest}
            />
        </>
    );
};

export default CheckoutPage;