import React, { useEffect, useState } from 'react';
import CartList from '../../../components/Home/Cart/CartList';
import NavBar from '../../../components/Home/Index/NavBar';
import { addItemToCart, getCartByUserId } from '../../../services/CartService';
import { json, useParams } from 'react-router-dom';
import CustomAlert from '../../../components/Include/CustomAlert';

const CartPage = () => {

    const {userId} = useParams();
    const [cartByUserId, setCartByUserId] = useState();
    const [quantitySelect,setQuantitySelect] = useState();
    const [alert,setAlert] = useState(null);

    const fetchCartByUserId  = async() => {
        try {
            const response = await getCartByUserId(userId);
            console.log(response.data);
            setCartByUserId(response.data);
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
            />
        </>
    );
};

export default CartPage;