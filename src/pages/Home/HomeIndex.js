import React, { useEffect, useState } from 'react';
import './HomeIndex.css';
import { getAllProducts } from '../../services/ProductService';
import Banner from '../../components/Home/Index/Banner';
import Popular from '../../components/Home/Index/Popular';
import NewProduct from '../../components/Home/Index/NewProduct';

const HomeIndex = () => {

    const [products,setProducts] = useState([]);
    const [paginationState, setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 6,
        sortOrder : 'asc',
        sortBy : 'productId'
    })

    const handleChangePagination = (name, value ) => {
        setPaginationState(prev => ({
            ...prev ,
            [name] : value
        }))
    }
    const fetchProducts = async () => {
        try {
            const data = await getAllProducts(paginationState);
            console.log(data.data);
            setProducts(data.data.content);
        } catch (error) {
            console.error('error in fetchProducts',error);
        }
    }
    useEffect(() => {
        fetchProducts();
    },[...Object.values(paginationState)])
    return (
        <>
           <div className="site-wrap">
            <Banner />
            <Popular
                 products = {products}
             />
            <NewProduct 
                products = {products}
            />
            {/* <Testimonials /> */}
        </div>
        </>
    );
};

export default HomeIndex;