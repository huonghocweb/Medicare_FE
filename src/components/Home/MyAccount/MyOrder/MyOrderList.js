import React from 'react';
import './MyOrderList.css';
import PaginationControls from '../../../Include/PaginationControls';

const MyOrderList = ({myOrders , orderStatus , paginationState , handleChangePaginationState , sortOptions , handleGetOrderByOrderId , handleUpdateOrderStatusByAciont }) => {
    return (
        <>
        <div className="order-status-container">
          <header>
            <h1 className='text-center'>My Orders</h1>
            <ul className="order-status-bar">
              <li
                onClick={() => handleChangePaginationState('statusIdSelected',0)}
                className={paginationState.statusIdSelected === 0 ? 'active' : ''}
              >
                All Orders
              </li>
              {orderStatus.map((item) => (
                <li
                  key={item.orderStatusId}
                  value={item.orderStatusId}
                  className={paginationState.statusIdSelected === item.orderStatusId ? 'active' : ''}
                  onClick={() => handleChangePaginationState('statusIdSelected',item.orderStatusId)}
                >
                  {item.orderStatusName}
                </li>
              ))}
            </ul>
            <PaginationControls
            paginationState={paginationState}
            handlePaginationChange={handleChangePaginationState}
            sortOptions={sortOptions}
             />
          </header>
    
          {/* Check if orders are null or empty */}
          {myOrders && myOrders.length > 0 ? (
            myOrders.map((order, index) => (
              <div key={index} className="order-status">
                <div className="order-status-shop-info">
                  <div className='price'>Order Info: <span>{order.orderId}</span></div>
                  <div className='price'>Order Date: <span>{order.paymentDatetime} </span></div>
                  <div className='price'>Status: <span>{order.orderStatus.orderStatusName}</span></div>
                </div>
    
                {order.orderDetails.map((item) => (
                <>
                <div key={item.orderDetailsId} className="order-status-details">
                    <img
                      // src={`/assets/images/${item.foodVariations.food.imageUrl}`}
                      src = {item.variation.product.imageUrl}
                      alt="Product"
                      className="order-status-product-img "
                    />
                    <div className="order-status-product-info">
                      <p className="order-status-food-name">{item.variation.product.productName}</p>
                      <p className="order-status-category-name">DosageForm: {item.variation.dosageForm.dosageFormName}</p>
                      <p className="order-status-category-name">Package : {item.variation.packaging.packageType}({item.variation.packaging.packageType})</p>
                      <p className='price-display'>
                        {(
                          item.variation.priceHistories[0].price
                        ).toLocaleString('vi-VN')}đ x {item.quantity} items
                      </p>
                    </div>
                  </div>
                </>
                ))}

                <p className="price text-center">Total Price: <span>{order.totalPrice.toLocaleString()}₫</span></p>
                <div className="order-status-actions">
                        {order.orderStatus.orderStatusActions.map((action, index) => (
                          <button
                            key={index}
                            className="order-status-return"
                            onClick={() => handleUpdateOrderStatusByAciont(order.orderId,action.orderStatusActionEndpoint)}
                          >
                            {action.orderStatusActionName}
                          </button>
                        ))}
                        <button 
                        onClick={() => handleGetOrderByOrderId(order.orderId)}
                        className="order-status-return" 
                        >See Details</button>
                </div>
              </div>
            ))
          ) : (
            <p style={{fontSize : '30px' ,color: 'red' , textAlign: 'center'}}>
            Not found Order <span><i className="fa-solid fa-face-sad-cry fa-xl" style={{color: '#63E6BE'}}></i> </span> </p>
          )}
        </div>
    
      </>
    );
};

export default MyOrderList;