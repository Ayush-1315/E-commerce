import "./App.css";
import {Routes,Route} from "react-router-dom";

import { Home } from "./frontend/pages/Home/home";
import { Cart } from "./frontend/pages/Cart/cart";
import { Wishlist } from "./frontend/pages/Wishlist/wishlist";
import { Navbar } from "./frontend/components/navbar";
import { Products } from "./frontend/pages/Products/products";
import { Footer } from "./frontend/components/footer";
import { Login } from "./frontend/pages/Login/login";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/search/:id" element={<Products/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
