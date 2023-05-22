import "./component CSS/cartProductCard.css";
import { addProductToWishlist } from "../services/addProductToWishlist";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";
export const CartProductCard=({product})=>{
    const {increaseProductQty,decreaseProductQty,removeCartProduct}=useCart();
    const {addItemToWishlist} =useWishlist()
    const token=localStorage.getItem("token");
    const {_id,title,offerPrice,price,discount,qty,image}=product;
    return <div className="cartCard">
        <div className="displayImage">
            <img src={image} alt={title} className="cartDisplayImage"/>
        </div>
        <div className="cartProductDetails">
            <span className="cartProductTitle">{title}</span>
            <p><span>₹{offerPrice}</span><span>₹{price}</span></p>
            <p>{discount}</p>
            <p>Quantity:<button onClick={()=>qty!==1?decreaseProductQty(_id):removeCartProduct(_id)}>-</button><span>{qty}</span><button onClick={()=>increaseProductQty(_id)}>+</button></p>
            <button onClick={()=>removeCartProduct(_id)}>Remove from Cart</button>
            <button onClick={()=>{addItemToWishlist(product);removeCartProduct(_id)}}>Move to Wishlist</button>
        </div>
    </div>;
}