import React from 'react';

const NewProduct = ({products}) => {
    return (
        <>
            <div className="site-section bg-light">
                <div className="container">
                    <div className="row">
                    <div className="title-section text-center col-12">
                        <h2 className="text-uppercase">New Products</h2>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12 block-3 products-wrap">
                        <div className="nonloop-block-3 owl-carousel">
                        {
                            products.map((item,index) => (
                                <div
                                 key={index}
                                 className="text-center item mb-4">
                                    <a href="shop-single.html"> <img width={'80px'} src={item.imageUrl} alt="Image"/></a>
                                    <h3 className="text-dark"><a href="shop-single.html">{item.productName}</a></h3>
                                    <p className="price"></p>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewProduct;