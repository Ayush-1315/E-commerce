import { WishListCard } from "../../components/wishlistCard"
import { useWishlist } from "../../context/wishistContext";
import { EmptyState } from "../../components/emptyState";
export const Wishlist=()=>{
    const {wishlistState}=useWishlist();
    const encodedToken=localStorage.getItem("token");
    const wishlistEmpty=wishlistState.length===0;
    return <div div style={{minHeight:"72vh"}}>
    {
        encodedToken?
       ( wishlistEmpty?<>
       <EmptyState message="Oops! It seems your wishlist is empty. Browse our products and find something you love."/>
       </>:wishlistState.map((product,index)=><WishListCard product={product} key={index}/>)):
       <h1>Login First</h1> 
    }
    
    </div>
}