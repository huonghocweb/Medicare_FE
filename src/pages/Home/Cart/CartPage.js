import React, { useEffect, useRef, useState } from 'react';
import CartList from '../../../components/Home/Cart/CartList';
import NavBar from '../../../components/Home/Index/NavBar';
import { addCouponToCart, addItemToCart, getCartByUserId, removeCouponToCart } from '../../../services/CartService';
import { json, useParams } from 'react-router-dom';
import CustomAlert from '../../../components/Include/CustomAlert';
import CouponStoragePopup from '../../../components/Home/Cart/Checkout/CouponStoragePopup';
import { getCouponStorageByUserId } from '../../../services/CouponStorageService';
import { checkCoupon } from '../../../services/CouponService';

const CartPage = () => {

    const {userId} = useParams();
    const [cartByUserId, setCartByUserId] = useState();
    const [quantitySelect,setQuantitySelect] = useState();
    const [alert,setAlert] = useState(null);

    const codeInputRef = useRef();
    const [couponByCode,setCouponByCode] = useState(null);
    const [isOpentCouponStorage,setIsOpentCouponStorage] = useState(false);
    const [couponStorageByUserId,setCouponStorageByUserId] = useState([]);
    const [paginationState, setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'couponStorageId', 
        totalPage : ''
    })
  
    const fetchGetCouponStorageByUserId = async () => {
        try {
            const resCouponStorageByUserId = await getCouponStorageByUserId(userId , paginationState);
            setCouponStorageByUserId(resCouponStorageByUserId.data.data.content);
        } catch (error) {
            console.error('error in fetchGetCouponStorageByUserId',error);
        }
    }

    const handelCheckCoupon = async (code) => {
        console.log(code);
        try {
            const resCheckCoupon = await checkCoupon(code);
            console.log(resCheckCoupon.data.data.data);
            if(resCheckCoupon.data.data.accept){
                setAlert({type : 'success',message : 'Use Coupon Success !'});
                codeInputRef.current= code;
                console.log(resCheckCoupon.data.data.data);
                setCouponByCode(resCheckCoupon.data.data.data);
               // fetchCartByUserId();
                handleOpenCouponStorage();
            }else {
                setAlert({type : 'error', message: `${resCheckCoupon.data.data.message}` })
            }
        } catch (error) {
            console.error('error in handleCheck Coupon',error);
        }
    }

    const handleOpenCouponStorage = () => {
        fetchGetCouponStorageByUserId()  ;
        setIsOpentCouponStorage(!isOpentCouponStorage);
    }

    const handleAddCouponToCart = async () => {
        try {
            const resCart = await addCouponToCart(userId,codeInputRef.current);
            console.log(resCart.data);
            if(resCart.data.data){
                setAlert({type : 'success', message : 'Add Coupon To Cart Success !'})
                fetchCartByUserId();
            }
        } catch (error) {
            console.error('error in handle Add Coupon To Cart',error);
        }
    }

    const handleRemoveCoupon = async() => {
        try {
            const resCart = await removeCouponToCart(userId,couponByCode.code);
            if(resCart.data.data ){
                setAlert({type : 'success', message : 'Remove Coupon To Cart Success !'})
                setCouponByCode(null);
                fetchCartByUserId();
            }
            console.log(resCart.data);
        } catch (error) {
            console.error('error in remove Coupon To Cart',error);
        }
    }

    const fetchCartByUserId  = async() => {
        try {
            const response = await getCartByUserId(userId);
            console.log(response.data);
            setCartByUserId(response.data);
            if(response.data.coupon){
                setCouponByCode(response.data.coupon);
                console.log(response.data.coupon);
            }
        } catch (error) {
            console.error('error in fetch Cart By UserId',error);
        }
    }
    
    const handleAddItemToCart = async(vaId,quantity)=>{
        const formData = new FormData();
        const cartItem = {};
        cartItem[vaId] = quantity;
        console.log(cartItem);
        formData.append('cartItems',new Blob([JSON.stringify(cartItem)] , {type : 'application/json'}));
        try {
           const response = await addItemToCart(userId,formData);
           console.log(response);
            fetchCartByUserId();
            //setAlert({type: 'success',message : 'Add Item Success'});
        } catch (error) {
            console.error('error in handle Add Item To Cart',error);
        }
    }
    useEffect(() => {
        if(userId) {
            fetchCartByUserId();
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
            <NavBar />
            <CartList
                cartByUserId = {cartByUserId}
                handleAddItemToCart = {handleAddItemToCart}
                handleOpentCouponStorage = {handleOpenCouponStorage}
                codeInputRef = {codeInputRef}
                handleAddCouponToCart ={handleAddCouponToCart}
                couponByCode = {couponByCode}
                handleRemoveCoupon = {handleRemoveCoupon}
            />
            <CouponStoragePopup 
                isOpenCouponStorage={isOpentCouponStorage}
                handleOpenCouponStorage = {handleOpenCouponStorage}
                couponStorageByUserId = {couponStorageByUserId}
                handelCheckCoupon = {handelCheckCoupon}
                codeInputRef = {codeInputRef}
            />
        </>
    );
};

export default CartPage;