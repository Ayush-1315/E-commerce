import {
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { cart, cartReducerFun } from "../reducers/cartReducer";
import { error,notify } from "../../App";
import { useAuth } from "./authContext";
import { getCart } from "../services/getCartItems";
import { addProductToCart } from "../services/addProductToCart";
import { increaseQty } from "../services/increaseQuantity";
import { decreaseQty } from "../services/decreaseQuantity";
import { removeFromCart } from "../services/removefromCart";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const { authState } = useAuth();
  const [cartState, cartDispatch] = useReducer(cartReducerFun, cart);
  const token = localStorage.getItem("token");
  const getUserCart = async (searchToken) => {
    try {
      const cart = await getCart(searchToken);
      cartDispatch({ type: "LOAD_CART", payload: cart });
    } catch (e) {
      console.log(e);
    }
  };
  const addItem = async (product) => {
    if (token) {
      try {
        const updatedCart = await addProductToCart(product, token);
        cartDispatch({ type: "LOAD_CART", payload: updatedCart });
        notify("Added to cart");
      } catch (e) {
        console.log(e);
      }
    }
    else{
       error("Please login to continue.")
    }
  };
  const increaseProductQty=async(productID)=>{
    if(token){
       try{
         const updatedCart=await increaseQty(productID,token);
         cartDispatch({ type: "LOAD_CART", payload: updatedCart });
         
    }
    catch(e){
        console.log(e);
    }
    }
  }
  const decreaseProductQty=async(productID)=>{
    if(token){
        try{
          const updatedCart=await decreaseQty(productID,token);
          cartDispatch({ type: "LOAD_CART", payload: updatedCart });
     }
     catch(e){
         console.log(e);
     }
     }
  }
  const removeCartProduct=async(productID)=>{
    if(token){
        try{
          const updatedCart=await removeFromCart(productID,token);
          cartDispatch({ type: "LOAD_CART", payload: updatedCart });
     }
     catch(e){
         console.log(e);
     }
     }
  }
  const resetCart=()=>{
    cartDispatch({type:"RESET"});
    cartState.map(({_id})=>removeCartProduct(_id));
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserCart(localStorage.getItem("token"));
    }
  }, [authState]);
  const cartItems=cartState.length;
  return (
    <CartContext.Provider value={{ cartState, cartDispatch, addItem,increaseProductQty,decreaseProductQty,removeCartProduct,resetCart,cartItems}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
