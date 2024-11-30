import React from 'react';

const Checkout = ({cartByUserId , paymentMethods , userByUserId , handlePaymentRequest}) => {
  if(!cartByUserId ){
    return <p>Loading...</p>
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
          <div className="col-md-6 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">Billing Details</h2>
            <div className="p-3 p-lg-5 border">

              <div className="form-group row">
                <div className="col-md-6">
                  <label  className="text-black">Full Name <span className="text-danger">*</span></label>
                  <input value={userByUserId.fullName} type="text" className="form-control"/>
                </div>
                <div className="col-md-6">
                  <label  className="text-black">Phone Number <span className="text-danger">*</span></label>
                  <input value={userByUserId.phoneNumber} type="text" className="form-control" />
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
                <div className="form-group row">
                <div className="col-md-12">
                  <label  className="text-black">Address <span className="text-danger">*</span></label>
                  <input type="text" className="form-control"  placeholder="Street address"/>
                </div>
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
          <div className="col-md-6">
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                <div className="p-3 p-lg-5 border">
                  <label for="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                  <div className="input-group w-75">
                    <input type="text" className="form-control" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code"
                      aria-describedby="button-addon2"/>
                    <div className="input-group-append">
                      <button className="btn btn-primary btn-sm px-4" type="button" id="button-addon2">Apply</button>
                    </div>
                  </div>
    
                </div>
              </div>
            </div>
    
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
                        <td className="text-black">{cartByUserId.totalPrice.toLocaleString('vi')} đ</td>
                      </tr>
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