import { WishListCard } from "../../components/wishlistCard"
import { useCart } from "../../context/cartContext"
import { useWishlist } from "../../context/wishistContext";
export const Wishlist=()=>{
    const {cartState}=useCart();
    const {wishlistState}=useWishlist();
    return <>
    {
        wishlistState.map((product,index)=><WishListCard product={product} key={index}/>)
    }
    
    </>
}