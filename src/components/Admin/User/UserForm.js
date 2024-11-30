import React from 'react';
import { NavLink } from 'react-router-dom';

const UserForm = ({userById, handleSubmit, handleUploadUser,register,roles , roleIdChecked,handleChangeRoleId , handleChangeImage , userImage}) => {
    console.log(roleIdChecked);
    return (
        <>
        <div id="content-page" className="content-page">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-3">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                            <h4 className="card-title">{userById ? 'Update User' : 'Add New User'}</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <form>
                            <div className="form-group">
                                <div className="add-img-user profile-img-edit">
                                    <img
                                     className="profile-pic img-fluid"  
                                      src={userImage}
                                      alt="profile-pic"/>
                                    <div className="p-image">
                                    <input
                                     className="file-upload"
                                      type="file" 
                                      onChange={(e) => handleChangeImage(e)}/>
                                    </div>
                                </div>
                                {/* <div className="img-extension mt-3">
                                    <div className="d-inline-block align-items-center">
                                        <span>Only</span>
                                    <a href="javascript:void();">.jpg</a>
                                    <a href="javascript:void();">.png</a>
                                    <a href="javascript:void();">.jpeg</a>
                                    <span>allowed</span>
                                    </div>
                                </div> */}
                            </div>
                            <div className="form-group">
                                <label>User Role:</label>
                                <select className="form-control" id="selectuserrole">
                                    <option>Select</option>
                                    <option>Web Designer</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="furl">Facebook Url:</label>
                                <input type="text" className="form-control" id="furl" placeholder="Facebook Url"/>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                            <h4 className="card-title">New User Information</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="new-user-info">
                            <form onSubmit={handleSubmit(handleUploadUser)}>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label for="fname">User Name:</label>
                                        <input 
                                        {...register('userName')}
                                        type="text"
                                         className="form-control" 
                                         placeholder="User Name"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Full Name:</label>
                                        <input 
                                        {...register('fullName')}
                                        type="text"
                                        className="form-control"
                                        placeholder="Full Name"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Phone Number:</label>
                                        <input 
                                        {...register('phoneNumber')}
                                        type="text"
                                         className="form-control"
                                          
                                          placeholder="Mobile Number"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Email:</label>
                                        <input 
                                        {...register('email')}
                                        type="email" 
                                        className="form-control" 
                                         placeholder="Email"/>
                                    </div>
                                    
                                    <div className="form-group col-md-6">
                                        <label >Birth Day :</label>
                                        <input 
                                        {...register('birthday')}
                                        type="date"
                                         className="form-control"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label >Status  :</label>
                                        <select 
                                        className="form-control"
                                        {...register('status')}
                                         >
                                            <option >Status</option>
                                            <option value={1}>Active</option>
                                            <option value={0}>InActive</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label >Address:</label>
                                        <input
                                        {...register('address')}
                                         type="text"
                                          className="form-control"
                                           placeholder="Address"/>
                                    </div>
                                    <div className="form-group col-sm-6">
                                             <label className="d-block">Gender:</label>
                                             <div className="custom-control custom-radio custom-control-inline">
                                                <input {...register('gender')} value="1" type="radio"  className="custom-control-input"/>
                                                <label className="custom-control-label"> Male </label>
                                             </div>
                                             <div className="custom-control custom-radio custom-control-inline">
                                                <input {...register('gender')} value="0" type="radio"  className="custom-control-input"/>
                                                <label className="custom-control-label" > Female </label>
                                             </div>
                                          </div>
                                    <div className="form-group col-sm-6">
                                             <label className="d-block">User Roles:</label>
                                             {
                                                roles.map((item,index) => (
                                                    <div 
                                                    key={index}
                                                    className="custom-control custom-radio custom-control-inline">
                                                <input
                                                 type="checkbox"  
                                                 className="custom-control-input"
                                                 value={item.roleId}
                                                 checked={roleIdChecked.includes(item.roleId)}
                                                 onChange={() => handleChangeRoleId(item.roleId)}
                                                  />
                                                <label className="custom-control-label" for="customRadio6"> {item.roleName} </label>
                                             </div>
                                                ))
                                             }
                                    </div>
                                </div>
                                <hr/>
                                <h5 className="mb-3">Security</h5>
                                <div className="row">
                                    <div className="form-group col-md-6">
                                        <label for="pass">Password:</label>
                                        <input
                                        {...register('password')}
                                         type="password" 
                                         className="form-control"
                                          placeholder="Password"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="rpass">Repeat Password:</label>
                                        <input type="password" className="form-control" id="rpass" placeholder="Repeat Password "/>
                                    </div>
                                </div>
                                <div className="checkbox">
                                    <label><input className="mr-2" type="checkbox"/>Enable Two-Factor-Authentication</label>
                                </div>
                                <button type="submit" className="btn btn-primary">{userById ? 'Update' : 'Create'}</button>
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

export default UserForm;