import { BrowserRouter , Route, Routes } from 'react-router-dom'; 
import './App.css';
import HomeLayOut from './HomeLayOut';
import AdminLayOut from './AdminLayOut';
import HomeIndex from './pages/Home/HomeIndex';
import UserListPage from './pages/Admin/User/UserListPage';
import UserFormPage from './pages/Admin/User/UserFormPage';
import ProductListPage from './pages/Admin/Product/ProductListPage';
import ProductFormPage from './pages/Admin/Product/ProductFormPage';
import DetailsPage from './pages/Home/Details/DetailsPage';
import CartPage from './pages/Home/Cart/CartPage';
import CheckoutPage from './pages/Home/Cart/CheckoutPage';
import ThanksPage from './pages/Home/Thanks/ThanksPage';
import OrderListPage from './pages/Admin/Order/OrderListPage';
import LoginPage from './pages/Home/Login/LoginPage';
import MyOrderListPage from './pages/Home/MyAccount/MyOrder/MyOrderListPage';
import MyDeliveryAddressPage from './pages/Home/MyAccount/MyDeliveryAddress/MyDeliveryAddressPage';
import CouponListPage from './pages/Admin/Coupon/CouponListPage';
import CouponFormPage from './pages/Admin/Coupon/CouponFormPage';
import MyCouponListPage from './pages/Home/MyAccount/MyCoupon/MyCouponListPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomeLayOut />} >
              <Route index element={<HomeIndex />}></Route>
              <Route path=':productId' element={<DetailsPage />} ></Route>
              <Route path='cart/:userId' element={<CartPage />}></Route>
              <Route path='cart/checkout/:userId' element= {<CheckoutPage/>} ></Route>
              <Route path='/thanks/:paymentMethodId' element ={<ThanksPage/>} ></Route>
              <Route path='login' element={<LoginPage/>} />

              <Route path='myOrder/:userId' element={<MyOrderListPage/>} />
              <Route path='myDelivery/:userId' element={<MyDeliveryAddressPage/> }/>
              <Route path='myCoupon/:userId' element={<MyCouponListPage/>} />
            </Route>

            <Route path='/admin' element = {<AdminLayOut/>} >
              <Route index element ={<UserListPage />}/>
              <Route path='users' element={<UserListPage/>} />
              <Route path='user/create' element={<UserFormPage/>} />
              <Route path='user/update/:userId' element={<UserFormPage/>} />

              <Route path='products' element={<ProductListPage/>} />
              <Route path='product/create' element={<ProductFormPage/>} />
              <Route path='product/update/:productId' element={<ProductFormPage/>} />

              <Route path='coupons' element={<CouponListPage/>} />
              <Route path='coupon/create' element={<CouponFormPage/>} />
              <Route path='coupon/update/:couponId' element={<CouponFormPage/>} />

              <Route path='orders' element={<OrderListPage/>} ></Route>
            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
