import { Link,useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";
import Unlike from "../../images/heart.png";
import Like from "../../images/likes.png";
import { notify } from "../../App";
export const ProductCard = ({product}) => {
  const navigate=useNavigate();
  const {addItem,cartState}=useCart();
  const {wishlistState,addItemToWishlist,removeWishlistProduct}=useWishlist();
  const { _id, title, offerPrice, image,discount,price}=product;
  const clickHandler = (e) => {
    e.preventDefault();
    addItem(product);
    
  };
  const goToCart=(e)=>{
    e.preventDefault();
    navigate("/cart");
  }
  const addWishlist=(e)=>{
    e.preventDefault();
    addItemToWishlist(product);
  }
  const removeWishlist=(e)=>{
    e.preventDefault();
   removeWishlistProduct(_id);
   notify("Removed from Wishlist");
  }
  const itemAlreadyInCart=cartState.reduce((acc,{_id:cartProductId})=>cartProductId===_id?true:acc,false);
  const itemAlreadyInWishList=wishlistState.reduce((acc,{_id:cartProductId})=>cartProductId===_id?true:acc,false);
  return (
    <li className="card">
      <Link to={`/products/${_id}`}>
        <div className="productCard">
          <img src={image} alt={title} className="productImage" />
          <div className="cardBottom">
          <p className="productTitle">{title}</p>
          <p className="prices"><span className="priceOnCard">{price}</span><span className="offeredPrice">₹{offerPrice}</span></p>
          <p className="discountOnCard">{discount}</p>
          </div>
          { itemAlreadyInCart?
        
            <button className="cartBtn" onClick={goToCart}>
              Go to Cart
            </button>
          
          :  
          <button className="cartBtn" onClick={clickHandler}>
            Add to Cart
          </button>
         }
         {
          itemAlreadyInWishList ? <button onClick={removeWishlist} className="likeButton"><img src={Like} alt="wishlist" className="likes" /></button>:<button onClick={addWishlist} className="likeButton"><img src={Unlike} alt="wishlist" className="likes" /></button>
         }
        </div>
      </Link>
    </li>
  );
};
