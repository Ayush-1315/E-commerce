import { Link } from "react-router-dom";
import { useCart } from "../context/cartContext";
export const ProductCard = ({product}) => {
  const {addItem,cartState}=useCart();
  const { id, title, offerPrice, image,discount,price}=product;
  const clickHandler = (e) => {
    e.preventDefault();
    addItem(product);
  };
  const itemAlreadyInCart=cartState.reduce((acc,{id:cartProductId})=>cartProductId===id?true:acc,false);
  return (
    <li className="card">
      <Link to={`/products/${id}`}>
        <div className="productCard">
          <img src={image} alt={title} className="productImage" />
          <div className="cardBottom">
          <p className="productTitle">{title}</p>
          <p className="prices"><span className="priceOnCard">{price}</span><span className="offeredPrice">₹{offerPrice}</span></p>
          <p className="discountOnCard">{discount}</p>
          </div>
          <button className="cartBtn" onClick={clickHandler}>
            { itemAlreadyInCart?"Go to Cart ":"Add to Cart"}
          </button>
        </div>
      </Link>
    </li>
  );
};
