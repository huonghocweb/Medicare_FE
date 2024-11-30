import React from 'react';
import { NavLink } from 'react-router-dom';

const Popular = ({products}) => {
    return (
        <>
         <div className="site-section">
            <div className="container">
                <div className="row">
                <div className="title-section text-center col-12">
                    <h2 className="text-uppercase">Popular Products</h2>
                </div>
                </div>

                <div className="row">
                {
                    products.map((item,index) => (
                    <div
                    key={index} 
                    className="col-sm-6 col-lg-4 text-center item mb-4">
                    <NavLink to={`/${item.productId}`}>
                        <a href="shop-single.html"> <img src={item.imageUrl} style={{width : '180px' , height : '180px' , borderRadius : '20px'}} alt="Image"/></a>
                        <h3 className="text-dark"><a href="shop-single.html">{item.productName}</a></h3>
                        <p className="price"><del>95.00</del> &mdash; {item.basePrice.toLocaleString('vi')}đ</p>
                    </NavLink>
                    </div>
                    ))
                }
              
                </div>
                <div className="row mt-5">
                <div className="col-12 text-center">
                    <a href="shop.html" className="btn btn-primary px-4 py-3">View All Products</a>
                </div>
                </div>
            </div>
            </div>   
        </>
    );
};

export default Popular;