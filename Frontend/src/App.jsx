import Home from "./component/Home/Home";
import Footer from "./component/layout/Footer/Footer";
import Header from "./component/layout/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignup from "./component/User/LoginSignup";
import { useEffect } from "react";
import { store } from "./store";
import { loadUser } from "./Actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import PaymentPage from "./component/Cart/PaymentPage";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <BrowserRouter>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/products" element={<Products />} />

        <Route path="/products/:keyword" element={<Products />} />

        <Route path="/search" element={<Search />} />

        <Route path="/login" element={<LoginSignup />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          element={
            <ProtectedRoute
              redirectTo="/login"
              isAuthenticated={isAuthenticated}
            />
          }
        >
          <Route path="/account" element={<Profile />} />

          <Route path="/me/update" element={<UpdateProfile />} />

          <Route path="/password/update" element={<UpdatePassword />} />

          <Route path="/shipping" element={<Shipping />}></Route>

          <Route path="/order/confirm" element={<ConfirmOrder />} />

          <Route path="/process/payment" element={<PaymentPage />} />

          <Route path="/paymentsuccess" element={<OrderSuccess />} />

          <Route path="/orders" element={<MyOrders />} />

          <Route path="/order/:id" element={<OrderDetails />} />

          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />

        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
