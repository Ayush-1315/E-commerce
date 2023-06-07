import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";
import { notify } from "../../App";
export const WishListCard=({product})=>{
    const {removeWishlistProduct}=useWishlist();
    const {cartState}=useCart();
    const {addItem}=useCart();
    const {_id,title,offerPrice,price,discount,image}=product;
    const itemAlreadyInCart = cartState.reduce(
        (acc, { _id: cartProductId }) => (cartProductId === _id ? true : acc),
        false
      );
    const removeProduct=()=>{
        notify("Removed from Wishlist");
        removeWishlistProduct(_id);
    }
    const moveToCart=()=>{
        if(!itemAlreadyInCart)
        addItem(product);
        removeWishlistProduct(_id);
    }
    return <div className="cartCard">
        <div className="displayImage">
            <img src={image} alt={title} className="cartDisplayImage"/>
        </div>
        <div className="cartProductDetails">
            <span className="cartProductTitle">{title}</span>
            <p className="cart-prices"><span>₹{offerPrice}</span><span>₹{price}</span></p>
            <p>{discount}</p>
            <div className="cart-action-buttons">
            <button onClick={removeProduct}>Remove from Wishlist</button>
            <button onClick={moveToCart}>Move to Cart</button>
            </div>
        </div>
    </div>;
}