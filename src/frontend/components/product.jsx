import "./component CSS/productDetailCard.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";

export const ProductDetailCard = ({ product }) => {
  const { cartState,addItem } = useCart();
  const {addItemToWishlist,wishlistState} =useWishlist();
  const navigate = useNavigate();
  const {
    category,
    features,
    discount,
    _id,
    image,
    offerPrice,
    price,
    rating,
    seller,
    title,
  } = product;
  const featuresList = Object.entries(features);
  const goToCart = () => {
    navigate("/cart");
  };
  const goToWishlist=()=>{
    navigate("/wishlist");
  }
 const clickHandler=()=>{
  addItem(product);
 }
 const addtoWishlist=()=>{
  addItemToWishlist(product);
 }
  const itemAlreadyInCart = cartState.reduce(
    (acc, { _id: cartProductId }) => (cartProductId === _id ? true : acc),
    false
  );
  const itemAlreadyInWishlist = wishlistState.reduce(
    (acc, { _id: cartProductId }) => (cartProductId === _id ? true : acc),
    false
  );
  return (
    <>
      <div className="detailCard">
        <div className="imageHolder">
          <img src={image} alt={title} className="productDetailImage" />
        </div>
        <div className="detailsHolder">
          <h2>{title}</h2>
          <p>{category}</p>
          <p>
            <span className="offer">₹{offerPrice}</span>{" "}
            <span className="price">₹{price}</span>{" "}
            <span className="discount">{discount}</span>
          </p>
          <p>Raings: {rating}</p>
          <p>Seller: {seller}</p>
          {itemAlreadyInCart ? (
            <button className="btn" onClick={goToCart}>
              Go to Cart
            </button>
          ) : (
            <button className="btn" onClick={clickHandler}>Add to Cart</button>
          )}
          {itemAlreadyInWishlist ? (
            <button className="btn" onClick={goToWishlist}>
              Go to Wishlist
            </button>
          ) : (
            <button className="btn" onClick={addtoWishlist}>Add to Wishlist</button>
          )}
        </div>
      </div>
      <div className="featuresTable">
        <h2>Product Details</h2>
        {featuresList.map((feature, index) => (
          <p _id={index} className="featureEntry" key={index}>
            <span className="feature">{feature[0]}</span>
            <span className="featureValue">{feature[1]}</span>
          </p>
        ))}
      </div>
    </>
  );
};
