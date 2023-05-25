import { useEffect, createContext, useContext, useReducer,useRef } from "react";
import { getWishList } from "../services/getWishlistItems";
import { addProductToWishlist } from "../services/addProductToWishlist";
import { wishlist, wishlistReducerFun } from "../reducers/wishlistReducer";
import { useAuth } from "./authContext";
import { removeFromWishlist } from "../services/removeFromWishlist";
import {error, notify} from "../../App";
export const WishlistContext = createContext();
export const WishlistProvider = ({ children }) => {
  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducerFun,
    wishlist
  );
  const { authState } = useAuth();
  const storedToken = localStorage.getItem("token");
  const token=useRef(storedToken)
  const getUserWishlist = async (searchToken) => {
    try {
      const wishlist = await getWishList(searchToken);
      wishlistDispatch({ type: "LOAD_CART", payload: wishlist });
    } catch (e) {
      console.log(e);
    }
  };
  const addItemToWishlist = async (product) => {
    if (token.current) {
      try {
        const updatedWishlist = await addProductToWishlist(product, token.current);
        wishlistDispatch({ type: "LOAD_CART", payload: updatedWishlist });
        notify("Added to wishlist");
      } catch (e) {
        console.log(e);
      }
    } else {
      error("Please login to continue");
    }
  };
  const removeWishlistProduct = async (productID) => {
    if (token.current) {
      try {
        const updatedWishlist = await removeFromWishlist(productID, token.current);
        wishlistDispatch({ type: "LOAD_CART", payload: updatedWishlist });
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    if (token.current) {
      getUserWishlist(token.current);
    }
  }, [authState]);
  return (
    <WishlistContext.Provider
      value={{
        addItemToWishlist,
        wishlistState,
        removeWishlistProduct,
        wishlistDispatch,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
export const useWishlist = () => useContext(WishlistContext);
