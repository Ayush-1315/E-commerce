import "./App.css";
import {Routes,Route} from "react-router-dom";
import { Home } from "./frontend/pages/Home/home";
import { Cart } from "./frontend/pages/Cart/cart";
import { Wishlist } from "./frontend/pages/Wishlist/wishlist";
import { Navbar } from "./frontend/components/navbar";
import { Products } from "./frontend/pages/Products/products";
import { Footer } from "./frontend/components/footer";
import { Login } from "./frontend/pages/Login/login";
import { PrivateRoute } from "./frontend/components/privateRoute";
import { UserPage } from "./frontend/pages/User/viewUser";
import { Signup } from "./frontend/pages/Signup/signup";
import {Product} from "./frontend/pages/Product Details/productDetails";
import { ToastContainer, toast } from 'react-toastify';
import { OrderSummary } from "./frontend/pages/Checkout/orderSummary";
import { Error } from "./frontend/pages/Error Page/errorPage";
import Mockman from "mockman-js";
import { OrderSuccess } from "./frontend/pages/Order Success/orderSuccessPage";
export const notify=(message)=>{
  toast.success(message, {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
      });
};
export const error=(message)=>{
  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "light",
    });
}
function App() {
  return (
    <div className="App">
     <Navbar/>
    <div className="container">
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/wishlist" element={
          <PrivateRoute>
            <Wishlist/>
          </PrivateRoute>
        }/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/search/:string" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/mockman" element={ <Mockman />}/>
        <Route path="/products/:productID" element={<Product/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/user" element={
          <PrivateRoute>
            <UserPage/>
          </PrivateRoute>
        } />
        <Route path="/cart" element={
          <PrivateRoute>
            <Cart/>
          </PrivateRoute>
        } />
        <Route path="/*" element={<Error/>}/>
        <Route path="/checkout" element={<OrderSummary/>}/>
        <Route path="/success" element={<OrderSuccess/>}/>
      </Routes>
      <ToastContainer/>
    </div>
      <Footer/>
    </div>
  );
}

export default App;
