import React from 'react';
import { NavLink } from 'react-router-dom';

const CartList = ({cartByUserId , handleAddItemToCart , handleOpentCouponStorage , codeInputRef ,
     handleAddCouponToCart , couponByCode ,handleRemoveCoupon}) => {
    console.log(couponByCode);
    if(!cartByUserId){
        return <p>Loading...</p>
    }
    return (
        <>
                 <div className="site-section">
            <div className="container">
            <div className="row mb-5">
            <form className="col-md-12" method="post">
                <div className="site-blocks-table">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th className="product-thumbnail">Image</th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price </th>
                        <th className="product-price">Package Type</th>
                        <th className="product-quantity">Quantity</th>
                        <th className="product-total">Total</th>
                        <th className="product-remove">Remove</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cartByUserId?.cartItems.map((item,index) => (
                            <tr key={index}>
                        <td className="product-thumbnail">
                        <img src={item.variation.product.imageUrl} alt="Image" className="rounded-circle img-fluid avatar-70" />
                        </td>
                        <td className="product-name">
                        <h2 className="h5 text-black">{item.variation.product.productName}</h2>
                        </td>
                        <td>{item.variation.priceHistories[0].price.toLocaleString('vi')} đ</td>
                        <td>{item.variation.packaging.packageType}</td>
                        <td>
                        <div className="input-group mb-3" style={{maxWidth : '140px'}}>
                            <div className="input-group-prepend">
                            <button className="btn js-btn-minus" type='button' onClick={() => handleAddItemToCart(item.variation.variationId, -1)}><i className="fa-solid fa-minus"></i></button>
                            </div>
                            <input type="text" className="form-control text-center" value={item.quantity} placeholder=""
                            />
                            <div className="input-group-append">
                            <button 
                            className="btn js-btn-plus" 
                            type="button"
                            onClick={() => handleAddItemToCart(item.variation.variationId, 1)}
                            ><i className="fa-solid fa-plus"></i></button>
                            </div>
                        </div>
        
                        </td>
                        <td>{item.price.toLocaleString('vi')} đ</td>
                        <td><a href="#" className="btn btn-primary height-auto btn-sm">X</a></td>
                    </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </form>
            </div>
        
            <div className="row">
            <div className="col-md-6">
                <div className="row mb-5">
                <div className="col-md-6">
                    <NavLink to={`/`} className="btn btn-primary btn-md btn-block">Continue</NavLink>
                </div>
                </div>
                <div className="row">
                <div className="col-md-12">
                    <label className="text-black h4" for="coupon">Coupon</label>
                    <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-2 ">
                    <input value={codeInputRef.current} src={codeInputRef} type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                </div>
                <div className="col-md-2">
                    <button onClick={handleOpentCouponStorage} className="btn btn-primary"> Storage</button>
                </div>
                    { couponByCode && (
                        <>
                        <div className="col-md-8 ">
                            <p style={{border : '5px solid #ddd'}}> <img src={couponByCode.imageUrl} className='avatar-70' /> Discount : 
                            {couponByCode.discountPercent}%</p>
                        </div>
                        <div className="col-md-4">
                            <button onClick={()=> handleRemoveCoupon()} className="btn btn-primary"> Delete</button>
                        </div>
                        </>
                    ) }
                <div className="col-md-6">
                <button onClick={handleAddCouponToCart} className="btn btn-primary btn-md btn-block">Apply Coupon </button>
                </div>
               
                </div>
            </div>
            <div className="col-md-6 pl-5">
                <div className="row justify-content-end">
                <div className="col-md-7">
                    <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                        <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-md-6">
                        <span className="text-black">Subtotal</span>
                    </div>
                    <div className="col-md-6 text-right">
                        <strong className="text-black">{cartByUserId?.totalPrice.toLocaleString('vi')} đ</strong>
                    </div>
                    </div>
                    <div className="row mb-3">
                    <div className="col-md-6">
                        <span className="text-black">Discount</span>
                    </div>
                    <div className="col-md-6 text-right">
                        <strong className="text-black"> - {cartByUserId?.discountAmount.toLocaleString('vi')} đ</strong>
                    </div>
                    </div>
                    <div className="row mb-5">
                    <div className="col-md-6">
                        <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                        <strong className="text-black">$230.00</strong>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                        <NavLink className="btn btn-primary btn-lg btn-block" to={`/cart/checkout/${cartByUserId.user.userId}`}>Proceed To
                        Checkout</NavLink>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>   
        </>
    );
};

export default CartList;