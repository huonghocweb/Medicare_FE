import React, { useEffect, useState } from 'react';
import DetailsList from '../../../components/Home/Details/DetailsList';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../../services/ProductService';
import NavBar from '../../../components/Home/Index/NavBar';
import {  getDosagesFormByProductId } from '../../../services/DosageFormService';
import { getPackagingsByProductId } from '../../../services/PackagingService';
import { getVariationByDosageFormIdAndPackagingId, getVariationsByDosageFormId } from '../../../services/VariationService';
import { addItemToCart } from '../../../services/CartService';
import CustomAlert from '../../../components/Include/CustomAlert';

const DetailsPage = () => {

    const {productId} = useParams();
    const [productById ,setProductById] = useState();
    const [dosageFormsByProductId,setDosageFormsByProductId] = useState([]);
    const [packagingsByProductId,setPackagingsByProductId] = useState([]);
    const [dosageFormIdSelected,setDosageFormIdSelected] = useState();
    const [variationChoosed,setVariationChoosed] = useState(null);
    const [cartItem, setCartItem] = useState([{}]);
    const [quantitySelect, setQuantitySelect] = useState(1);
    const [alert,setAlert] = useState(null);

    const fetchProductById = async () => {
        try {
            const response = await getProductById(productId);
            setProductById(response.data);
        } catch (error) {
            console.error('error in fetch Product By Id',error);
        }
    }
    const fetchDosageFormByProductId = async () => {
        try {
            const response = await getDosagesFormByProductId(productId);
            setDosageFormsByProductId(response.data);
        } catch (error) {
            console.error('error in fetch All Dosage Form',error);
        }
    }
    const fetchPackagingByProductId = async () => {
        try {
            const response = await getPackagingsByProductId(productId);
            setPackagingsByProductId(response.data);
        } catch (error) {
            console.error('error in fetch All Dosage Form',error);
        }
    }

    const handleGetVariationsByDosageFormId = async (dosageFormId) => {
        try {
            const response = await getVariationsByDosageFormId(productId,dosageFormId);
            setDosageFormIdSelected(dosageFormId);
            console.log(response.data);
        } catch (error) {
            console.error('error in handle Get Variations By DosageFormId',error);
        }
    }

    const handleGetVariationsByDosageFormIdAndPackagingId = async (packageId) => {
        console.log(productId);
        console.log(dosageFormIdSelected);
        console.log(packageId);
        try {
            const response = await getVariationByDosageFormIdAndPackagingId(productId, dosageFormIdSelected,packageId);
            console.log(response.data);
            setVariationChoosed(response.data);
        } catch (error) {
            console.error('error in handleGetVariationsByDosageFormIdAndPackagingId ',error);
        }
    }

    const handleChangeQuantitySelect = async (valId,delta) => {
        const deltaInt = parseInt(delta);
        setQuantitySelect(prev => {
            const newQuantity = (prev + deltaInt) <1 ? prev : (prev + deltaInt);
            setCartItem(( ) => ({
                [valId] : newQuantity
            }))
            return newQuantity ;
        });
        console.log(quantitySelect)
        console.log(deltaInt);
    }

    const handleAddItemToCart = async () => {
        console.log(cartItem);
        console.log(JSON.stringify(cartItem));
        const formData = new FormData();
        formData.append('cartItems',new Blob([JSON.stringify(cartItem)], {type : 'application/json'}));
        try {
            const response = await addItemToCart(1, formData);
            if(response.data != null){
                setAlert({type : 'success', message :'Add Item To Cart Success !'});
            }else{
                setAlert({type : 'error', message :'Add Item To Cart Failed !'});
            }
            setQuantitySelect(1);
            setVariationChoosed(null);
            console.log(response.data);
        } catch (error) {
            console.error('error in handle Add Item To Cart',error);
        }
    }
    useEffect(() => {
        fetchProductById();
        fetchDosageFormByProductId();
        fetchPackagingByProductId();
    },[]);
    return (
        <>
        {
            alert && (
                <CustomAlert
                type ={alert.type}
                message ={alert.message}
                onClose={() => setAlert(null)}
                 />
            )
        }
        <NavBar/>
            <DetailsList
            productById = {productById}
            dosageFormsByProductId= {dosageFormsByProductId}
            packagingsByProductId = {packagingsByProductId}
            handleGetVariationsByDosageFormId = {handleGetVariationsByDosageFormId}
            handleGetVariationsByDosageFormIdAndPackagingId = {handleGetVariationsByDosageFormIdAndPackagingId}
            variationChoosed = {variationChoosed}
            handleAddItemToCart = {handleAddItemToCart}
            quantitySelect = {quantitySelect}
            handleChangeQuantitySelect = {handleChangeQuantitySelect}
             />
        {/*    */}
        </>
    );
};

export default DetailsPage;