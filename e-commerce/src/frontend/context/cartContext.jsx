import {
  useState,
  useEffect,
  createContext,
  useContext,
  useReducer,
} from "react";
import { cart, cartReducerFun } from "../reducers/cartReducer";
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
      } catch (e) {
        console.log(e);
      }
    }
    else{
        alert('Log in first');
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
  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [authState]);
  return (
    <CartContext.Provider value={{ cartState, cartDispatch, addItem,increaseProductQty,decreaseProductQty,removeCartProduct}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
