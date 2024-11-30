import React from 'react';
import { NavLink } from 'react-router-dom';

const ProductForm = ({productId, register, handleSubmit, categories, submitProduct,handleChangeFile , imageProduct}) => {
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
                                 src={imageProduct  } 
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
                              <label>Role:</label>
                              <select
                               className="form-control" 
                              >
                                 <option>Select</option>
                                 {
                                    categories.map((item,index) => (
                                       <option key={index}>{item.categoryName}</option>
                                    ))
                                 }
                              </select>
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
                           <form onSubmit={handleSubmit(submitProduct)}>
                              <div className="row">
                                 <div className="form-group col-md-6">
                                    <label for="fname">Name Product :</label>
                                    <input 
                                    {...register('productName')}
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Name Product "/>
                                 </div>
                                 <div className="form-group col-md-6">
                                    <label for="lname">Base Price (VNĐ) : </label>
                                    <input 
                                       type="text" 
                                       className="form-control" 
                                       {...register('basePrice')} 
                                       onBlur={(e) => {
                                          const value = e.target.value;
                                          e.target.value = Number(value.replace(/\D/g, 'đ')).toLocaleString('vi-VN');
                                       }}
                                    />
                                 </div>
                                 <div className="form-group col-sm-12">
                                    <label>Category:</label>
                                    <select
                                     className="form-control"  
                                    {...register('categoryId')}
                                    >
                                    <option>Select Category</option>
                                       {
                                          categories.map((item,index) => (
                                             <option key={index} value={item.categoryId}>{item.categoryName}</option>
                                          ))
                                       }
                                    </select>
                                 </div>
                                 <div className="form-group col-md-12" >
                                    <label for="city">Description:</label>
                                    <textarea
                                    style={{ height: '90px', resize: 'none' }}
                                     rows={2}
                                     className="form-control"
                                     {...register('description')} />
                                 </div>
                                 <div className="form-group col-md-6">
                                    <label for="lname">Create Date : </label>
                                    <input 
                                       type="date" 
                                       className="form-control" 
                                       {...register('createAt')} 
                                    />
                                 </div>
                              </div>
                              <hr/>
                              <div className="checkbox">
                                 <label><input className="mr-2" type="checkbox"/>Enable Two-Factor-Authentication</label>
                              </div>
                              <button type="submit" className='btn btn-primary'>{productId ? 'Update' : 'Create' }</button>
                              <button type="submit" className='btn btn-secondary'><NavLink to={`/admin/products`}>Back</NavLink> </button>
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

export default ProductForm;