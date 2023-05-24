import { useState, useEffect } from "react";
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
  const update = () => {
    const newObj = cartState.reduce(
      (acc, { qty, price, offerPrice }) => ({
        items: cartState.length,
        price: (acc.price += parseInt(price.replace(",", ""))*qty),
        discount: acc.discount+=(parseInt(price.replace(",", "")) - parseInt(offerPrice.replace(",", "")))*qty,
        totalPrice:(acc.price-acc.discount)
      }),
      initialPricing
    );
    setPrice(cartState.length===0?initialPricing:newObj);
  };
  useEffect(()=>{
    update();   
  },[cartState])
  console.log(cartState);
  console.log(priceDetails);
  const {items,price,discount,totalPrice}=priceDetails
  return <div className="priceCard">
    <h2>PRICE DETAILS</h2>
    <p>Price ({items}) ₹{price}</p>
    <p>Discount -₹{discount}</p>
    <p>Delivery Charges FREE</p>
    <p>Total Price ₹{totalPrice}</p>
    <p>You will save  ₹{discount}</p>
    <p><button>Place Order</button></p>
  </div>;
};
