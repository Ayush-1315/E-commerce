import "./component CSS/cartProductCard.css";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishistContext";
import { notify } from "../../App";
import "react-toastify/dist/ReactToastify.css";
export const CartProductCard = ({ product }) => {
  const { increaseProductQty, decreaseProductQty, removeCartProduct } =useCart();
  const { addItemToWishlist, wishlistState } = useWishlist();
  const { _id, title, offerPrice, price, discount, qty, image } = product;
  const itemAlreadyInWishlist = wishlistState.reduce(
    (acc, { _id: cartProductId }) => (cartProductId === _id ? true : acc),
    false
  );
  const moveProduct = () => {
    if (!itemAlreadyInWishlist) addItemToWishlist(product);
    removeCartProduct(_id);
  };
  const removeProduct = () => {
    notify("Removed from cart");
    removeCartProduct(_id);
  };
  const manageQty = (type) => {
    if (type === "increase") increaseProductQty(_id);
    else if (type === "decrease") {
      qty !== 1 ? decreaseProductQty(_id) : removeCartProduct(_id);
    }
  };
  return (
    <div className="cartCard">
      <div className="displayImage">
        <img src={image} alt={title} className="cartDisplayImage" />
      </div>
      <div className="cartProductDetails">
        <span className="cartProductTitle">{title}</span>
        <p className="cart-prices">
          <span>₹{offerPrice}</span>
          <span>₹{price}</span>
        </p>
        <p>Discount: <span>{discount}</span></p>
        <p>
          Quantity:<button onClick={() => manageQty("decrease")} className="qty-btns">-</button>
          <span>{qty}</span>
          <button onClick={() => manageQty("increase")} className="qty-btns">+</button>
        </p>
        <p className="cart-action-buttons">
        <button onClick={removeProduct}>Remove from Cart</button>
        <button onClick={moveProduct}><span>Save for Later </span><span className="material-symbols-outlined">
favorite
</span></button>
        </p>
      </div>
    </div>
  );
};
