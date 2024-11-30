import { NavLink } from "react-router-dom";

const Thanks = ({ isPaymentSuccess , orderResponse, handleGetOrderByOrderId }) => {

    return (
        <div id="thanksPage">
            <div className="content">
                {/* Hiển thị SVG */}
                {
                    isPaymentSuccess ? (
                        <svg viewBox="0 0 24 24" style={{ width: '200px', color: 'green' }}>
                            <path
                                fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                            />
                        </svg>
                    ) : isPaymentSuccess === false ? (
                        <svg viewBox="0 0 24 24" style={{ width: '200px', color: 'red' }}>
                            <path
                                fill="currentColor"
                                d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.707 13.707a1 1 0 0 1-1.414 0L12 13.414l-3.293 3.293a1 1 0 0 1-1.414-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1 0 1.414z"
                            />
                        </svg>
                    ) : (
                        <svg
                            style={{ width: '150px', height: '150px', color: 'gray' }}
                            viewBox="0 0 50 50"
                        >
                            <circle
                                cx="25"
                                cy="25"
                                r="20"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeLinecap="round"
                                strokeDasharray="31.4 31.4"
                            >
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    repeatCount="indefinite"
                                    dur="1s"
                                    keyTimes="0;1"
                                    values="0 25 25;360 25 25"
                                />
                            </circle>
                        </svg>
                    )
                }

                {/* Hiển thị nội dung thông báo */}
                <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
                    {isPaymentSuccess
                        ? 'Payment Success!'
                        : isPaymentSuccess === false
                        ? 'Payment Failed!'
                        : 'Loading...'}
                </h3>

                {/* Nút điều hướng */}
                {isPaymentSuccess && (
                    <button
                        className="btn btn-success"
                        onClick={() => handleGetOrderByOrderId(orderResponse.orderId)}
                    >
                        See Order
                    </button>
                )}
                {orderResponse && (
                    <div className="row">
                        <h4>Order Summary</h4>
                        <p>
                            <strong>Order ID:</strong> <span>{orderResponse?.orderId}</span>
                        </p>
                        <p>
                            <strong>Full Name:</strong> <span>{orderResponse?.user.fullName}</span>
                        </p>
                        <p>
                            <strong>Total Price:</strong> <span>{Number(orderResponse?.totalPrice).toLocaleString('vi-VN')} VNĐ</span>
                        </p>
                        <p>
                            <strong>Payment Date:</strong> 
                            <span>
                                {new Date(orderResponse.paymentDatetime).toLocaleDateString('vi')} 
                                at {new Date(orderResponse.paymentDatetime).toLocaleTimeString('vi')}
                            </span>
                        </p>
                        <div className="total">
                            Total Amount: {Number(orderResponse?.totalPrice).toLocaleString('vi-VN')} VNĐ
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Thanks;
