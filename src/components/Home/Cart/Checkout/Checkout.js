import React from 'react';
import LoadingPopup from '../../../Include/LoadingPopup';

const Checkout = ({cartByUserId , paymentMethods , userByUserId , handlePaymentRequest , handleOpenDelivery  , addressState
  
}) => {
  if(!cartByUserId || !userByUserId ){
    return <>
      <LoadingPopup/>
    </>
  }
    return (
        <>
             <div className="site-section">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-12">
            <div className="bg-light rounded p-3">
              <p className="mb-0">Returning customer? <a href="#" className="d-inline-block">Click here</a> to login</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">Billing Details</h2>
            <div className="p-3 p-lg-8 border">

              <div className="form-group row">
                <div className="col-md-6">
                  <label  className="text-black">Full Name <span className="text-danger">*</span></label>
                  <input value={userByUserId.fullName} type="text" className="form-control"/>
                </div>
                <div className="col-md-6">
                  <label  className="text-black">Phone Number <span className="text-danger">*</span></label>
                  <input value={userByUserId.phoneNumber} type="text" className="form-control"  />
                </div>
              </div>
           
              <div className="form-group row mb-5">
                <div className="col-md-6">
                  <label  className="text-black">Email Address <span className="text-danger">*</span></label>
                  <input type="text" value={userByUserId.email} className="form-control" />
                </div>
                <div className="col-md-6">
                  <label for="c_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                  <input type="text" className="form-control" placeholder="Phone Number"/>
                </div>
                </div>
                <div className="col-md-12">
                  <label for="c_phone" className="text-black">Delivery Address <span className="text-danger">*</span></label>
                  <textarea style={{fontSize : '16px'}} type="text" value={addressState.fullAddress} rows="2" className="form-control" disabled></textarea>
                </div>
                <div className="form-group row mb-5" style={{marginTop : '20px'}}>
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-6">
                        <button 
                        onClick={handleOpenDelivery}
                        className="btn btn-primary btn-lg"
                        >Delivery Address
                        </button>
                    </div>
                    </div>
             
              <div className="form-group">
                <label className="text-black" data-toggle="collapse"
                 ><input type="checkbox" value="1"
                   /> Create an account?</label>
                <div className="collapse" id="create_an_account">
                  <div className="py-2">
                    <p className="mb-3">Create an account by entering the information below. If you are a returning customer
                      please login at the top of the page.</p>
                    <div className="form-group">
                      <label className="text-black">Account Password</label>
                      <input type="email" className="form-control" 
                        placeholder=""/>
                    </div>
                  </div>
                </div>
              </div>
    
              <div className="form-group">
                <label for="c_ship_different_address" className="text-black" data-toggle="collapse"
                  href="#ship_different_address" role="button" aria-expanded="false"
                  aria-controls="ship_different_address"><input type="checkbox" value="1" />
                   Ship To A Different Address?</label>
              </div>
    
              <div className="form-group">
                <label for="c_order_notes" className="text-black">Order Notes</label>
                <textarea name="c_order_notes" id="c_order_notes" cols="30" rows="5" className="form-control"
                  placeholder="Write your notes here..."></textarea>
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Your Order</h2>
                <div className="p-3 p-lg-5 border">
                  <table className="table site-block-order-table mb-5">
                    <thead>
                      <th>Product</th>
                      <th>Image</th>
                      <th>Total</th>
                    </thead>
                    <tbody>
                    {
                      cartByUserId.cartItems.map((item,index) => (
                        <tr key={index}>
                        <td>{item.variation.product.productName} <strong className="mx-2">x</strong> {item.quantity}</td>
                        <td><img src={item.variation.product.imageUrl}  className='avatar-40'/></td>
                        <td>{item.variation.priceHistories[0].price.toLocaleString('vi')} đ</td>
                      </tr>
                      ))
                    }
                      <tr>
                        <td className="text-black font-weight-bold"><strong> Total Quantity</strong></td>
                        <td></td>
                        <td className="text-black">{cartByUserId.totalQuantity} Item</td>
                      </tr>
                      <tr>
                        <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                        <td></td>
                        <td className="text-black"><strong>{cartByUserId.totalPrice.toLocaleString('vi')} đ</strong></td>
                      </tr>
                      {
                        cartByUserId.coupon && (
                          <tr>
                            <td className="text-black font-weight-bold"><strong>Coupon </strong></td>
                            <td></td>
                            <td className="text-black"> <strong>- {cartByUserId.discountAmount.toLocaleString('vi')} đ</strong></td>
                         </tr>
                        )
                      }
                      {
                        addressState.shipFee && (
                          <tr>
                            <td className="text-black font-weight-bold"><strong>Ship Fee </strong></td>
                            <td></td>
                            <td className="text-black"> <strong> {addressState.shipFee.toLocaleString('vi')}đ </strong></td>
                         </tr>
                        )
                      }
                      <tr>
                        <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                        <td></td>
                        <td className="text-black font-weight-bold"><strong>$350.00</strong></td>
                      </tr>
                    </tbody>
                  </table>
                    {
                        paymentMethods.map((item,index) => (
                            <div 
                            onClick={() => handlePaymentRequest(item.paymentMethodId, cartByUserId.totalPrice)}
                            className="border mb-5"
                             key={index}>
                                <h3 className="h6 mb-0">
                                       <span> <img className="rounded-circle img-fluid avatar-70"  src={item.imageUrl}/></span>
                                    </h3>
                            </div>
                        ))
                    }
                  <div className="form-group">
                    <button 
                    className="btn btn-primary btn-lg btn-block"
                     >Payment
                      </button>
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

export default Checkout;