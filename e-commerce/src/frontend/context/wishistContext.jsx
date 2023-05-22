import {
    useState,
    useEffect,
    createContext,
    useContext,
    useReducer,
  } from "react";
  import { getWishList } from "../services/getWishlistItems";
import { addProductToWishlist } from "../services/addProductToWishlist";
import { wishlist,wishlistReducerFun } from "../reducers/wishlistReducer";
import { useAuth } from "./authContext";
import { removeFromWishlist } from "../services/removeFromWishlist";
  export const WishlistContext = createContext();
  export const WishlistProvider = ({ children }) => {
    const [wishlistState,wishlistDispatch]=useReducer(wishlistReducerFun,wishlist);
    const { authState } = useAuth();
    const token = localStorage.getItem("token");
    const getUserWishlist = async (searchToken) => {
      try {
        const wishlist = await getWishList(searchToken);
        wishlistDispatch({ type: "LOAD_CART", payload: wishlist });
      } catch (e) {
        console.log(e);
      }
    };
    const addItemToWishlist = async (product) => {
      if (token) {
        try {
          const updatedWishlist = await addProductToWishlist(product, token);
          wishlistDispatch({ type: "LOAD_CART", payload: updatedWishlist });
        } catch (e) {
          console.log(e);
        }
      }
      else{
          alert('Log in first');
      }
    };
    const removeWishlistProduct=async(productID)=>{
      if(token){
          try{
            const updatedWishlist=await removeFromWishlist(productID,token);
            wishlistDispatch({ type: "LOAD_CART", payload: updatedWishlist });
       }
       catch(e){
           console.log(e);
       }
       }
    }
    useEffect(() => {
      if (token) {
        getUserWishlist(token);
      }
    }, [authState]);
    return (
      <WishlistContext.Provider value={{addItemToWishlist,wishlistState,removeWishlistProduct }}>
        {children}
      </WishlistContext.Provider>
    );
  };
  export const useWishlist = () => useContext(WishlistContext);
  