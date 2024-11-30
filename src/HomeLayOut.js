import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Home/Index/Header';
import Footer from './components/Home/Index/Footer';
import BannerFooter from './components/Home/Index/BannerFooter';

const HomeLayOut = () => {
    return (
        <div>
          <Header />
          <Outlet></Outlet>
          <BannerFooter />
          <Footer />
        </div>
        
    );
};

export default HomeLayOut;