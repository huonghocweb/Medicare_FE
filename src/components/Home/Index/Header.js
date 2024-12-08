import React, { useEffect, useState } from 'react';
import {Nav,NavLink, useNavigate} from 'react-router-dom';
import { getUserByToken } from '../../../services/UserService';
import LoadingPopup from '../../Include/LoadingPopup';
import MyAccountPanel from '../MyAccount/MyAccountPanel';
import { removeToken } from '../../../services/AuthService';

const Header = () => {

    const [userByToken,setUserByToken] = useState(null);
    const [isOpenAccountPanel,setIsOpenAccountPanel] = useState(null);
    const navigate = useNavigate();

    const handleChangIsOpen = () => {
      setIsOpenAccountPanel(!isOpenAccountPanel);
    }

    const fetchUserByToken = async () => {
      try {
        const response = await getUserByToken();
        setUserByToken(response.data);
      } catch (error) {
        console.error('error in fetchUserByToken ', error);
      }
    }

    const handleLogout = async () => {
      try {
        removeToken();
        handleChangIsOpen();
        navigate(`/login`);
        window.location.reload();
      } catch (error) {
        console.error('error i handleLogout',error)
      }
    }

    useEffect(() => {
      fetchUserByToken();
    },[])


    return (
        <>
         <div className="site-navbar py-2">
            <div className="search-wrap">
              <div className="container">
                <a href="#" className="search-close js-search-close"><span className="icon-close2"></span></a>
                <form action="#" method="post">
                  <input type="text" className="form-control" placeholder="Search keyword and hit enter..."/>
                </form>
              </div>
            </div>

            <div className="container">
              <div className="d-flex align-items-center justify-content-between">
                <div className="logo">
                  <div className="site-logo">
                    <NavLink to={`/`}className="js-logo-clone">Pharma</NavLink>
                  </div>
                </div>
                <div className="main-nav d-none d-lg-block">
                  <nav className="site-navigation text-right text-md-center" role="navigation">
                    <ul className="site-menu js-clone-nav d-none d-lg-block">
                      <li className="active"><NavLink to={`/`}>Home</NavLink></li>
                      <li><a href="shop.html">Store</a></li>
                      <li className="has-children">
                        <a href="#">Dropdown</a>
                        <ul className="dropdown">
                          <li><a href="#">Supplements</a></li>
                          <li className="has-children">
                            <a href="#">Vitamins</a>
                            <ul className="dropdown">
                              <li><a href="#">Supplements</a></li>
                              <li><a href="#">Vitamins</a></li>
                              <li><a href="#">Diet &amp; Nutrition</a></li>
                              <li><a href="#">Tea &amp; Coffee</a></li>
                            </ul>
                          </li>
                          <li><a href="#">Diet &amp; Nutrition</a></li>
                          <li><a href="#">Tea &amp; Coffee</a></li>
                        </ul>
                      </li>
                      <li><a href="about.html">About</a></li>
                      <li><NavLink to="admin" >ADMIN</NavLink></li>
                    </ul>
                  </nav>
                </div>
                <div className="icons">
                  <a href="#" className="icons-btn d-inline-block js-search-open"><span className="icon-search"><i className="fa-solid fa-magnifying-glass"></i></span></a>
                  <NavLink  to={`/cart/1`} className="icons-btn d-inline-block bag">
                    <span className="icon-shopping-bag"><NavLink to={`/cart/1`}><i className="fa-solid fa-cart-shopping"></i></NavLink></span>
                    <span className="number">2</span>
                  </NavLink>
                </div>
                 {
                  userByToken ? (
                    <ul className="navbar-list">
                      <li>
                        <button onClick={handleChangIsOpen} className="search-toggle iq-waves-effect d-flex align-items-center bg-success rounded">
                            <img src={userByToken.imageUrl} className="avatar-50 rounded mr-3" alt="user"/>
                            <div className="caption">
                              <h6 className="mb-0 line-height text-white">{userByToken.userName}</h6>
                              <span className="font-size-12 text-white">{userByToken.roles.map(role => role.roleName).join(' , ') } </span>
                            </div>
                        </button>
                      </li>
                  </ul>
                  ) : (
                    <ul className="navbar-list">
                      <li>
                      <button onClick={handleChangIsOpen} className="search-toggle iq-waves-effect d-flex align-items-center  rounded">
                         <NavLink to={`/login`} className="icons-btn d-inline-block js-search-open">
                            LOG IN <i className="fa-solid fa-right-to-bracket fa-lg"></i></NavLink>
                      </button>
                      </li>
                      </ul>
                   
                  )
                 }
              </div>
            </div>
            </div>   
            <MyAccountPanel
              userByToken = {userByToken}
              isOpen={isOpenAccountPanel}
              handleChangIsOpen = {handleChangIsOpen}
              handleLogout= {handleLogout}
            />
        </>
    );
};

export default Header;