import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";

export const WishListCard=({product})=>{
    const {removeWishlistProduct}=useWishlist();
    const {addItem}=useCart();
    const token=localStorage.getItem("token");
    const {_id,title,offerPrice,price,discount,image}=product;
    return <div className="cartCard">
        <div className="displayImage">
            <img src={image} alt={title} className="cartDisplayImage"/>
        </div>
        <div className="cartProductDetails">
            <span className="cartProductTitle">{title}</span>
            <p><span>₹{offerPrice}</span><span>₹{price}</span></p>
            <p>{discount}</p>
            <button onClick={()=>removeWishlistProduct(_id)}>Remove from Wishlist</button>
            <button onClick={()=>{addItem(product);removeWishlistProduct(_id)}}>Move to Cart</button>
        </div>
    </div>;
}