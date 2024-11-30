import React from 'react';
import { Outlet } from 'react-router-dom';
import './pages/Admin/AdminIndex.css';
import './pages/Admin/Resonsive.css';
import './pages/Admin/Typogarphu.css';
import './pages/Admin/Bootstrapmin.css';
import SideBar from './components/Admin/SideBar';
import TopNavBar from './components/Admin/TopNavBar';
import Header from './components/Home/Index/Header';
import Footer from './components/Home/Index/Footer';
const AdminLayOut = () => {
    return (
        <div className="wrapper">
        <Header />
        <SideBar/>
        <TopNavBar/>
        <Outlet />
        <Footer/>
        </div>
    );
};

export default AdminLayOut;