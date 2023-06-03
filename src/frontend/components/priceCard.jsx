import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useCart } from "../context/cartContext";

export const PriceCard = () => {
  const { cartState } = useCart();
  const initialPricing={
    items: 0,
    price: 0,
    discount: 0,
    totalPrice: 0,
  }
  const [priceDetails, setPrice] = useState(initialPricing);
  useEffect(()=>{
    const initialPricing={
      items: 0,
      price: 0,
      discount: 0,
      totalPrice: 0,
    }
    const update = () => {
      const newObj = cartState.reduce(
        (acc, { qty, price, offerPrice }) => ({
          items: cartState.length,
          price: (acc.price += parseInt(price.replaceAll(",", ""))*qty),
          discount: acc.discount+=(parseInt(price.replaceAll(",", "")) - parseInt(offerPrice.replaceAll(",", "")))*qty,
          totalPrice:(acc.price-acc.discount)
        }),
        initialPricing
      );
      setPrice(cartState.length===0?initialPricing:newObj);
    };
    update() 
  },[cartState])

  const {items,price,discount,totalPrice}=priceDetails
  return <div className="priceCard">
    <h2>PRICE DETAILS</h2>
    <p>Price ({items}) ₹{price}</p>
    <p>Discount -₹{discount}</p>
    <p>Delivery Charges FREE</p>
    <p>Total Price ₹{totalPrice}</p>
    <p>You will save  ₹{discount}</p>
    <p><Link to="/check"><button>Proceed</button></Link></p>
  </div>;
};
