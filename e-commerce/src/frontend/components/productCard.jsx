import { Link } from "react-router-dom";
export const ProductCard = ({ id, title, price, image }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
  };
  return (
    <li className="card">
      <Link to={`/products/${id}`}>
        <div className="productCard">
          <img src={image} alt={title} className="productImage" />
          <p className="productTitle">{title}</p>
          <p className="productPrice">₹{price}</p>
          <button className="cartBtn" onClick={clickHandler}>
            Add to Cart
          </button>
        </div>
      </Link>
    </li>
  );
};
