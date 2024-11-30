import React from 'react';
import { NavLink } from 'react-router-dom';
import PaginationControls from '../../Include/PaginationControls';

const OrderList = ({orders, paginationState,hanldeChangePaginationState, sortOptions ,handleGetOrderByOrderId}) => {
   if(!orders){
      return (
         <p>Loading... </p>
      )
   }
    return (
        <>
        <div id="content-page" className="content-page">
  <div className="container-fluid">
     <div className="row">
        <div className="col-sm-12">
              <div className="iq-card">
                 <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                       <h4 className="card-title">User List</h4>
                    </div>
                 </div>
                 <div className="iq-card-body">
                    <div className="table-responsive">
                       <div className="row justify-content-between">
                          <div className="col-sm-12 col-md-6">
                             <div id="user_list_datatable_info" className="dataTables_filter">
                                <form className="mr-3 position-relative">
                                   <div className="form-group mb-0">
                                      <input type="search" className="form-control" id="exampleInputSearch" placeholder="Search" aria-controls="user-list-table"/>
                                   </div>
                                </form>
                             </div>
                          </div>
                          <div className="col-sm-12 col-md-6">
                             <div className="user-list-files d-flex float-right">
                             <NavLink
                              className="iq-bg-primary" 
                             to={`/admin/user/create`}  >
                                   New User
                                 </NavLink>
                                <a className="iq-bg-primary"  >
                                   Print
                                 </a>
                                <a className="iq-bg-primary" >
                                   Excel
                                 </a>
                                 <a className="iq-bg-primary" >
                                   Pdf
                                 </a>
                               </div>
                          </div>
                       </div>
                       <PaginationControls
                       paginationState={paginationState}
                       handlePaginationChange = {hanldeChangePaginationState}
                       sortOptions={sortOptions}
                        />
                       <table id="user-list-table" className="table table-striped table-borderless mt-4" role="grid" aria-describedby="user-list-page-info">
                         <thead>
                             <tr>
                                <th>NO.</th>
                                <th>Order Id</th>
                                <th>User Name</th>
                                <th>Payment Date</th>
                                <th>Total Quantity</th>
                                <th>Total Price </th>
                                <th>Address</th>
                                <th>Order Status</th>
                                <th>Action</th>
                                <th>Function</th>
                             </tr>
                         </thead>
                         <tbody>
                             {orders.map((item,index) => (
                                <tr key={index}>
                                <td>{index +1} </td>
                                <td>#<strong>{item.orderId}</strong> </td>
                                <td>{item.user.userName} </td>
                                <td>{new Date(item.paymentDatetime).toLocaleTimeString('vi')} - 
                                {new Date(item.paymentDatetime).toLocaleDateString('vi')}
                                </td>
                                <td>{item.totalQuantity} </td>
                                <td>{item.totalPrice.toLocaleString('vi')} đ</td>
                                <td>{item.deliveryAddress} </td>
                                <td>{item.orderStatus.orderStatusName} </td>
                                <td><span className="badge dark-icon-light iq-bg-primary">Active</span></td>
                                <td>
                                   <div className="flex align-items-center list-user-action">
                                        <button className="iq-bg-primary" onClick={() => handleGetOrderByOrderId(item.orderId)} ><i className="fa-solid fa-eye"></i></button>
                                   </div>
                                </td>
                             </tr>
                             ))}
                         </tbody>
                       </table>
                    </div>
                       <div className="row justify-content-between mt-3">
                          <div id="user-list-page-info" className="col-md-6">
                             <span>Showing 1 to 5 of 5 entries</span>
                          </div>
                          <div className="col-md-6">
                             <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-end mb-0">
                                   <li className="page-item disabled">
                                      <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                                   </li>
                                   <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                   <li className="page-item"><a className="page-link" href="#">2</a></li>
                                   <li className="page-item"><a className="page-link" href="#">3</a></li>
                                   <li className="page-item">
                                      <a className="page-link" href="#">Next</a>
                                   </li>
                                </ul>
                             </nav>
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

export default OrderList;