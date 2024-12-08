import React from 'react';
import './MyAccountPanel.css';
import { NavLink } from 'react-router-dom';

const MyAccountPanel = ({ userByToken, isOpen, handleChangIsOpen , handleLogout }) => {
  if (!userByToken){
    return (
      <p></p>
    )
  };

  return (
    <>
    {
      isOpen && (
        <div className="user-info-panel show">
      <div className="user-info-header">
        <h3>WelCome , {userByToken.userName} ! </h3>
        <button onClick={handleChangIsOpen} className="close-btn">✖</button>
      </div>
      <div className="user-info-content">
        <img src={userByToken.imageUrl} alt="User Avatar" className="user-avatar"/>
        {/* <div className="info-item">
          <strong>Account Name:</strong> <span>{userByToken.userName}</span>
        </div> */}
        <ul className="navbar-list">
          <li>
            <div className="iq-sub-dropdown iq-user-dropdown">
                <div className="iq-card shadow-none m-0">
                  <div className="iq-card-body p-0 ">
                      <div  className="iq-sub-card iq-bg-primary-hover">
                      <NavLink to={`/myOrder/${userByToken.userId}`}>
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="fa-solid fa-image-portrait fa-lg" style={{color:' #74C0FC'}}></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 " > My Profile</h6>
                              <p className="mb-0 font-size-12">View personal profile details.</p>
                            </div>
                        </div>
                        </NavLink>
                      </div>

                      <div  className="iq-sub-card iq-bg-primary-hover">
                      <NavLink to={`/myDelivery/${userByToken.userId}`}>
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                            <i class="fa-solid fa-house-user fa-lg" style={{color:' #74C0FC'}}></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 " > My Delivery Address</h6>
                              <p className="mb-0 font-size-12">View and set delivery address.</p>
                            </div>
                        </div>
                        </NavLink>
                      </div>

                      <div className="iq-sub-card iq-bg-primary-hover">
                      <NavLink to={`/myOrder/${userByToken.userId}`}>
                        <div className="media align-items-center">
                            <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="fa-solid fa-clipboard-list fa-lg" style={{color:' #74C0FC'}}></i>
                            </div>
                            <div className="media-body ml-3"  onClick={handleChangIsOpen}>
                              <h6 className="mb-0 ">My Order</h6>
                              <p className="mb-0 font-size-12">View your order details.</p>
                            </div>
                        </div>
                        </NavLink>
                      </div>
                      <div  className="iq-sub-card iq-bg-primary-hover">
                      <NavLink to={`/wishList/${userByToken.userId}`}>
                        <div className="media align-items-center" onClick={handleChangIsOpen}>
                            <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="fa-solid fa-heart fa-lg" style={{color:' #74C0FC'}}></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 ">Wish List </h6>
                              <p className="mb-0 font-size-12">Your Product In Wish List.</p>
                            </div>
                        </div>
                        </NavLink>
                      </div>
                      <div className="iq-sub-card iq-bg-primary-hover">
                      <NavLink to={`/myCoupon/${userByToken.userId}`}>
                        <div className="media align-items-center" onClick={handleChangIsOpen}>
                            <div className="rounded iq-card-icon iq-bg-primary">
                            <i className="fa-solid fa-ticket" style={{color:' #74C0FC'}}></i>
                            </div>
                            <div className="media-body ml-3">
                              <h6 className="mb-0 ">Coupon Storage </h6>
                              <p className="mb-0 font-size-12">Control your privacy parameters.</p>
                            </div>
                        </div>
                        </NavLink>
                      </div>
                      <div className="d-inline-block w-100 text-center p-3">
                        <button
                         className="btn btn-primary dark-btn-primary" 
                         onClick={handleLogout}
                          >Sign out  
                         <i className="fa-solid fa-right-to-bracket fa-lg"></i>
                         </button>
                      </div>
                  </div>
                </div>
            </div>
          </li>
      </ul>
      </div>
    </div>
      )
    }
    </>
  
  );
};

export default MyAccountPanel;
