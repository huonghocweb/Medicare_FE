import React from 'react';
import { NavLink } from 'react-router-dom';

const CouponForm = ({couponId , register, handleSubmit , submitCoupon , handleChangeFile, imageCoupon , errors }) => {
    return (
        <>
    <div id="content-page" className="content-page">
      <div className="container-fluid">
         <div className="row">
            <div className="col-lg-3">
                  <div className="iq-card">
                     <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                           <h4 className="card-title">Add New Product</h4>
                        </div>
                     </div>
                     <div className="iq-card-body">
                           <div className="form-group">
                              <div className="add-img-user profile-img-edit">
                                 <img 
                                 className="profile-pic img-fluid" 
                                 src={imageCoupon} 
                                 alt="profile-pic"/>
                                 <div className="p-image">
                                   <label>File Upload</label>
                                   <input 
                                    className="file-upload"
                                    type="file"
                                    onChange={(e) => handleChangeFile(e)}
                                   />
                                </div>
                              </div>
                           </div>
                           <div className="form-group">
                              <label>Facebook Url:</label>
                              <input type="text" className="form-control" id="furl" placeholder="Facebook Url"/>
                           </div>
                     </div>
                  </div>
            </div>
            <div className="col-lg-9">
                  <div className="iq-card">
                     <div className="iq-card-header d-flex justify-content-between">
                        <div className="iq-header-title">
                           <h4 className="card-title">New Product Information</h4>
                        </div>
                     </div>
                     <div className="iq-card-body">
                        <div className="new-user-info">
                           <form onSubmit={handleSubmit(submitCoupon)}>
                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <label for="fname">Code :</label>
                                    <input 
                                    {...register('code' , {
                                       required : 'Coupon Code is required'
                                    })}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Coupon Code  "/>
                                    {errors?.code && (
                                       <p className='errorsForm'> {errors.code.message} </p>
                                    )}
                                 </div>

                                 <div className="form-group col-md-6">
                                 </div>


                                 <div className="form-group col-md-6">
                                    <label for="lname"> Discount Percent  : </label>
                                    <input 
                                       type="text" 
                                       className="form-control" 
                                       {...register('discountPercent' , {
                                          required : 'Discount Percent is Required !',
                                          min : {value : 1 , message : 'Discount Percent is need >1% !',
                                          max : {value :100, message : 'Discount Percent is need <100%'}
                                          }
                                       })}
                                       placeholder="Coupon Code  " 
                                    />
                                    {
                                       errors?.discountPercent && (
                                          <p className='errorsForm'>{errors.discountPercent.message}</p>
                                       )
                                    }
                                 </div>

                                 <div className="form-group col-md-6">
                                    <label for="lname">Max Discount Amount (VNĐ) : </label>
                                    <input 
                                       type="text" 
                                       className="form-control" 
                                       {...register('maxDiscountAmount', {
                                          required : 'Max Discount Amount is required', 
                                          min : {value : 0, message : 'Max discount Amount is need > 0'}
                                       })} 
                                       onBlur={(e) => {
                                          const value = e.target.value;
                                          e.target.value = Number(value.replace(/\D/g, 'đ')).toLocaleString('vi-VN');
                                       }}
                                    />
                                      {
                                       errors?.maxDiscountAmount && (
                                          <p className='errorsForm'>{errors.maxDiscountAmount.message}</p>
                                       )
                                    }
                                 </div>

                               
                                 <div className="form-group col-md-6">
                                    <label for="lname">Use Limit : </label>
                                    <input 
                                       type="text" 
                                       className="form-control" 
                                       {...register('useLimit', {
                                          required: 'UseLimit is Required !'
                                       })} 
                                       onBlur={(e) => {
                                          const value = e.target.value;
                                          e.target.value = Number(value.replace(/\D/g, 'đ')).toLocaleString('vi-VN');
                                       }}
                                    />
                                       {
                                       errors?.useLimit && (
                                          <p className='errorsForm'>{errors.useLimit.message}</p>
                                       )
                                    }
                                 </div>
                           
                                 <div className="form-group col-md-6">
                                    <label for="lname">Used count   : </label>
                                    <input 
                                       type="text" 
                                       className="form-control" 
                                       {...register('usedCount', {
                                          required: 'Used Count is Required !'
                                       })} 
                                       placeholder="Used Count "
                                       onBlur={(e) => {
                                          const value = e.target.value;
                                          e.target.value = Number(value.replace(/\D/g, 'đ')).toLocaleString('vi-VN');
                                       }}
                                    />
                                       {
                                       errors?.usedCount && (
                                          <p className='errorsForm'>{errors.usedCount.message}</p>
                                       )
                                    }
                                 </div>

                                 <div className="form-group col-md-6">
                                    <label for="lname">Start Date : </label>
                                    <input 
                                       type="date" 
                                       className="form-control" 
                                       {...register('startDate', {
                                          required: 'Start Date is Required !'
                                       })} 
                                       placeholder="Start Date  "
                                    />
                                 </div>

                                 <div className="form-group col-md-6">
                                    <label for="lname">End Date : </label>
                                    <input 
                                       type="date" 
                                       className="form-control" 
                                       {...register('endDate', {
                                          required: 'End Date is Required !'
                                       })} 
                                    />
                                 </div>

                                 <div className="form-group col-md-12" >
                                    <label for="city">Description:</label>
                                    <textarea
                                    style={{ height: '90px', resize: 'none' }}
                                     rows={2}
                                     className="form-control"
                                     {...register('description')} />
                                 </div>
                               
                              </div>
                              <hr/>
                              <div className="checkbox">
                                 <label><input className="mr-2" type="checkbox"/>Enable Two-Factor-Authentication</label>
                              </div>
                              <button type="submit" className='btn btn-primary'>{couponId ? 'Update' : 'Create' }</button>
                              <button type="submit" className='btn btn-secondary'><NavLink to={`/admin/coupons`}>Back</NavLink> </button>
                           </form>
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

export default CouponForm;