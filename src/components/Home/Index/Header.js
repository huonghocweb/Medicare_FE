import React from 'react';
import {Nav,NavLink} from 'react-router-dom';

const Header = () => {
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
      <NavLink to={`/login`} className="icons-btn d-inline-block js-search-open">
      <span className="icon-search"><i className="fa-solid fa-right-to-bracket fa-lg"></i>
      </span></NavLink>
    </div>
  </div>
</div>
</div>   
        </>
    );
};

export default Header;