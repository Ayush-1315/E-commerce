import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import "./component CSS/priceCard.css";
export const PriceCard = () => {
  const { cartState } = useCart();
  const initialPricing = {
    items: 0,
    price: 0,
    discount: 0,
    totalPrice: 0,
  };
  const [priceDetails, setPrice] = useState(initialPricing);
  useEffect(() => {
    const initialPricing = {
      items: 0,
      price: 0,
      discount: 0,
      totalPrice: 0,
    };
    const update = () => {
      const newObj = cartState.reduce(
        (acc, { qty, price, offerPrice }) => ({
          items: cartState.length,
          price: (acc.price += parseInt(price.replaceAll(",", "")) * qty),
          discount: (acc.discount +=
            (parseInt(price.replaceAll(",", "")) -
              parseInt(offerPrice.replaceAll(",", ""))) *
            qty),
          totalPrice: acc.price - acc.discount,
        }),
        initialPricing
      );
      setPrice(cartState.length === 0 ? initialPricing : newObj);
    };
    update();
  }, [cartState]);

  const { items, price, discount, totalPrice } = priceDetails;
  return (
    <div className="priceCard">
      <h2>PRICE DETAILS</h2>
      <div className="price-details">
        <p>
          <span>Items </span>
          <span>({items}) </span>
        </p>
        <p>
          <span>Total Price</span> <span>₹{price}</span>
        </p>
        <p>
          <span>Discount </span>
          <span>-₹{discount}</span>
        </p>
        <p>
          <span>Grand Total</span> <span>₹{totalPrice}</span>
        </p>
        <p><span>Delivery Charges</span> <span>FREE</span></p>
        <p>
          <span>You will save</span> <span>₹{discount}</span>
        </p>
      </div>
      <p>
        <Link to="/checkout">
          <button>Proceed</button>
        </Link>
      </p>
    </div>
  );
};
