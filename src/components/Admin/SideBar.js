import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBar = () => {
   return (
      <>
         <div className="iq-sidebar">
            <div className="iq-sidebar-logo d-flex justify-content-between">
               <a href="index.html">
               <div className="iq-light-logo">
                  <img src="images/logo.gif" className="img-fluid" alt=""/>
               </div>
               <div className="iq-dark-logo">
                  <img src="images/logo-dark.gif" className="img-fluid" alt=""/>
               </div>
               <span>Vito</span>
               </a>
               <div className="iq-menu-bt-sidebar">
                     <div className="iq-menu-bt align-self-center">
                        <div className="wrapper-menu">
                           <div className="main-circle"><i className="ri-arrow-left-s-line"></i></div>
                           <div className="hover-circle"><i className="ri-arrow-right-s-line"></i></div>
                        </div>
                     </div>
                  </div>
            </div>
            <div id="sidebar-scrollbar">
               <nav className="iq-sidebar-menu">
                  <ul id="iq-sidebar-toggle" className="iq-menu">
                     <li className="iq-menu-title"><i className="ri-subtract-line"></i><span>Home</span></li>
                     <li>
                        <a href="index.html" className="iq-waves-effect"><i className="ri-home-4-line"></i><span>Dashboard</span></a>
                     </li>

                     <li className="iq-menu-title"><i className="ri-subtract-line"></i><span>Apps</span></li>
                     
                     <li>
                     <NavLink to={`/admin/orders`} className="iq-waves-effect">
                     <i className="ri-chat-check-line"></i><span>Orders</span>
                     </NavLink>
                     </li>
                     <li className="active">
                        <NavLink  className="iq-waves-effect collapsed" to='/admin/users' ><i className="ri-user-line"></i><span>User</span></NavLink>
                     </li>
                     <li className="active">
                        <NavLink  className="iq-waves-effect collapsed" to='/admin/products' ><i className="ri-user-line"></i><span>Product</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></NavLink>
                     </li>
                     <li className="active">
                        <NavLink  className="iq-waves-effect collapsed" to='/admin/coupons' ><i className="ri-user-line"></i><span>Coupon</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></NavLink>
                     </li>
                     
                     <li className="iq-menu-title"><i className="ri-subtract-line"></i><span>Components</span></li>
                     
                     <li>
                        <a href="#tables" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-table-line"></i><span>Table</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="tables" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><a href="tables-basic.html"><i className="ri-table-line"></i>Basic Tables</a></li>
                           <li><a href="data-table.html"><i className="ri-database-line"></i>Data Table</a></li>
                           <li><a href="table-editable.html"><i className="ri-refund-line"></i>Editable Table</a></li>
                        </ul>
                     </li>
                     <li>
                        <a href="#charts" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-pie-chart-box-line"></i><span>Charts</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="charts" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><a href="chart-morris.html"><i className="ri-file-chart-line"></i>Morris Chart</a></li>
                           <li><a href="chart-high.html"><i className="ri-bar-chart-line"></i>High Charts</a></li>
                           <li><a href="chart-am.html"><i className="ri-folder-chart-line"></i>Am Charts</a></li>
                           <li><a href="chart-apex.html"><i className="ri-folder-chart-2-line"></i>Apex Chart</a></li>
                        </ul>
                     </li>
                     <li>
                        <a href="#menu-level" className="iq-waves-effect collapsed" data-toggle="collapse" aria-expanded="false"><i className="ri-record-circle-line"></i><span>Menu Level</span><i className="ri-arrow-right-s-line iq-arrow-right"></i></a>
                        <ul id="menu-level" className="iq-submenu collapse" data-parent="#iq-sidebar-toggle">
                           <li><a href="#"><i className="ri-record-circle-line"></i>Menu 1</a></li>
                           <li><a href="#"><i className="ri-record-circle-line"></i>Menu 2</a></li>
                           <li><a href="#"><i className="ri-record-circle-line"></i>Menu 3</a></li>
                           <li><a href="#"><i className="ri-record-circle-line"></i>Menu 4</a></li>
                        </ul>
                     </li>
                  </ul>
               </nav>
               <div className="p-3"></div>
            </div>
         </div>  
      </>
   );
};

export default SideBar;