import React, { useEffect, useState } from 'react';
import ProductList from '../../../components/Admin/Product/ProductList';
import { getAllProducts } from '../../../services/ProductService';
import Header from '../../../components/Home/Index/Header';
import NavBar from '../../../components/Home/Index/NavBar';

const ProductListPage = () => {
    const [products,setProducts] = useState([]);

    const [paginationState,setPaginationState] = useState({
        pageCurrent : 0,
        pageSize : 8,
        sortOrder : 'asc',
        sortBy : 'productId',
        totalPage : ''
    })

    const handlePaginationChange = (name,value) => {
        setPaginationState(prev => ({
            ...prev ,
            [name] : value
        }))
    }

    const sortOptions =[
        { label : 'Product Id', value : 'productId' },
        { label : 'Product Name', value : 'productName' },
        { label : 'Base Price ', value : 'basePrice' },
    ]
    const fetchProducts = async ()=> {
        try {
            const data = await getAllProducts(paginationState);
            setProducts(data.data.content);
            handlePaginationChange('totalPage', data.data.totalPages);
        } catch (error) {
            console.error('error in fetch Products',error);
        }
    }
    useEffect(() => {
        fetchProducts();
    },[...Object.values(paginationState)])
    return (
        <>
            <ProductList
                products = {products}
                paginationState = {paginationState}
                handlePaginationChange = {handlePaginationChange}
                sortOptions = {sortOptions}
            />
        </>
    );
};

export default ProductListPage;