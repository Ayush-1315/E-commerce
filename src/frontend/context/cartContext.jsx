import {
  useEffect,
  createContext,
  useContext,
  useReducer,
  useRef
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
  const storedToken = localStorage.getItem("token");
  const token=useRef(storedToken)
  const getUserCart = async (searchToken) => {
    try {
      const cart = await getCart(searchToken);
      cartDispatch({ type: "LOAD_CART", payload: cart });
    } catch (e) {
      console.log(e);
    }
  };
  const addItem = async (product) => {
    if (token.current) {
      try {
        const updatedCart = await addProductToCart(product, token.current);
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
    if(token.current){
       try{
         const updatedCart=await increaseQty(productID,token.current);
         cartDispatch({ type: "LOAD_CART", payload: updatedCart });
         
    }
    catch(e){
        console.log(e);
    }
    }
  }
  const decreaseProductQty=async(productID)=>{
    if(token.current){
        try{
          const updatedCart=await decreaseQty(productID,token.current);
          cartDispatch({ type: "LOAD_CART", payload: updatedCart });
     }
     catch(e){
         console.log(e);
     }
     }
  }
  const removeCartProduct=async(productID)=>{
    if(token.current){
        try{
          const updatedCart=await removeFromCart(productID,token.current);
          cartDispatch({ type: "LOAD_CART", payload: updatedCart });
     }
     catch(e){
         console.log(e);
     }
     }
  }
  
  useEffect(() => {
    if (token.current) {
      getUserCart(token.current);
    }
  }, [authState]);
  return (
    <CartContext.Provider value={{ cartState, cartDispatch, addItem,increaseProductQty,decreaseProductQty,removeCartProduct}}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
