import { Link,useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
export const ProductCard = ({product}) => {
  const navigate=useNavigate();
  const {addItem,cartState}=useCart();
  const { _id, title, offerPrice, image,discount,price}=product;
  const clickHandler = (e) => {
    e.preventDefault();
    addItem(product);
  };
  const goToCart=(e)=>{
    e.preventDefault();
    navigate("/cart");
  }
  const itemAlreadyInCart=cartState.reduce((acc,{_id:cartProductId})=>cartProductId===_id?true:acc,false);
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
        </div>
      </Link>
    </li>
  );
};
