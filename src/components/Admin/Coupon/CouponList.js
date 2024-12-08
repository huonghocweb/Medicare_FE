import React from 'react';
import { NavLink } from 'react-router-dom';
import PaginationControls from '../../Include/PaginationControls';

const CouponList = ({coupons,paginationState,handleChangePaginationState, sortOptions}) => {
    if(!coupons){
        return (
            <p>Loading....</p>
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
                                <h4 className="card-title">Coupon List</h4>
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
                                        to={`/admin/coupon/create`}  >
                                            New Coupon
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
                                handlePaginationChange = {handleChangePaginationState}
                                sortOptions={sortOptions}
                                    />
                                <table id="user-list-table" className="table table-striped table-borderless mt-4" role="grid" aria-describedby="user-list-page-info">
                                    <thead>
                                        <tr>
                                            <th>NO.</th>
                                            <th>Coupon Id</th>
                                            <th>Image</th>
                                            <th>Code</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Max Discount Amount</th>
                                            <th>Use Limit</th>
                                            <th>Used Count </th>
                                            <th colSpan={2}>Function</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coupons.map((item,index) => (
                                            <tr key={index}>
                                            <td>{index +1} </td>
                                            <td>#<strong>{item.couponId}</strong> </td>
                                            <td><img src={item.imageUrl} className='avatar-50 rounded' /></td>
                                            <td>{item.code} </td>
                                            <td>
                                            {new Date(item.startDate).toLocaleDateString('vi')}
                                            </td>
                                            <td>
                                            {new Date(item.endDate).toLocaleDateString('vi')}
                                            </td>
                                            <td>{item.maxDiscountAmount.toLocaleString('vi')} đ</td>
                                            <td>{item.useLimit} </td>
                                            <td>{item.usedCount} </td>
                                            <td>
                                            <div className="flex align-items-center list-user-action">
                                            <NavLink className="iq-bg-primary" to={`/admin/coupon/update/${item.couponId}`}  ><i className="fa-solid fa-gear"></i></NavLink>
                                            <NavLink className="iq-bg-primary"  ><i className="fa-solid fa-trash"></i></NavLink>
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

export default CouponList;