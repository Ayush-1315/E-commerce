import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {v4 as uuid} from "uuid";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import "./orderSummary.css";
import { AddressForm } from "../../components/addressForm";
import { notify } from "../../../App";

export const OrderSummary = () => {
//    console.log(uuid());
  const { cartState,resetCart } = useCart();
  const [itemsList, setItemsList] = useState([]);
  const { addresses,orders,setOrders } = useUser();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [addNewAddress, setNewAddress] = useState(false);
  const addressChange = (e) => setDeliveryAddress(addresses[e.target.value]);
  const initialPricing = {
    items: 0,
    price: 0,
    discount: 0,
    totalPrice: 0,
  };
  const [priceDetails, setPrice] = useState(initialPricing);
  const navigate = useNavigate();
  const ref = useRef(navigate);
  useEffect(() => {
    cartState.length === 0 && ref.current("/*");
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
    setItemsList(
      cartState.map(({ title, qty, offerPrice, image }) => ({
        title,
        qty,
        offerPrice,
        image,
      }))
    );
  }, [cartState]);
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
  
      script.onload = () => {
        resolve(true);
      };
  
      script.onerror = () => {
        resolve(false);
      };
  
      document.body.appendChild(script);
    });
  };
const displayRazorpay = async () => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      alert("Razorpay SDK failed to load, check you internet connection");
      return;
    }
    const options = {
        // rzp_test_VNzbbuNCZjttNc
        // rzp_test_inOiRZzQS21nfX
      key: "rzp_test_inOiRZzQS21nfX",
      amount: Number(priceDetails.totalPrice) * 100,
      currency: "INR",
      name: "ShopsyCart",
      description: "Thank you for shopping with us",
      handler: function (response) {
        notify(`Payment of Rs. ${priceDetails.totalPrice} is Succesful`);
        setOrders([...orders,{
            orderId:uuid(),
            transactionId:response.razorpay_payment_id,
            items:itemsList,
            price:priceDetails,
            deliverTo:deliveryAddress
        }])
        navigate("/success");
        setTimeout(() => {
          console.log("Success")
          navigate("/");
          resetCart();
        }, 4000);
      },
      theme: {
        color: "#00b495",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      <div>
        <h1>OrderSummary</h1>
        <div className="orderSummaryContainer">
          <div className="addressComponent">
            <h3>Select Delivery Address</h3>
            {addresses.map((address, index) => (
              <label htmlFor={index} key={index} className="checkoutAddresses">
                <input
                  type="radio"
                  id={index}
                  name="deliveryAddress"
                  onChange={addressChange}
                  value={index}
                />
                <div>
                  <p>
                    {address?.firstName} {address?.lastName}
                  </p>
                  <p>{address?.email}</p>
                  <p>Ph:{address?.phone}</p>
                  <p>
                    Address: {address?.city},{address?.state},{address?.country}
                    ,{address?.pinCode}
                  </p>
                </div>
              </label>
            ))}
            <AddressForm
              showForm={addNewAddress}
              setFormFun={(val) => setNewAddress(val)}
              updateIndex={-1}
            />
            <button onClick={() => setNewAddress(true)}>Add new Address</button>
          </div>
          <div className="priceDetailsComponent">
            <div>Order Details</div>
            <div>
              <div>Item</div>
              <div>Price</div>
              {itemsList.map((item, index) => (
                <div key={index}>
                  <div>
                    <div>
                      {item?.title} X {item?.qty}
                    </div>
                    <div>
                      Rs.
                      {parseInt(item?.offerPrice.replaceAll(",", "")) *
                        parseInt(item?.qty)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>Price Details</div>
            <div>
              <p>Sub total: {priceDetails?.price}</p>
              <p>Discount: {priceDetails?.discount}</p>
              <p>Grand Total: {priceDetails?.totalPrice}</p>
            </div>
            <div>Deliver to</div>
            <div>
              {deliveryAddress ? (
                <div>
                  <p>
                    {deliveryAddress?.firstName} {deliveryAddress?.lastName}
                  </p>
                  <p>{deliveryAddress?.email}</p>
                  <p>Ph:{deliveryAddress?.phone}</p>
                  <p>
                    Address: {deliveryAddress?.city},{deliveryAddress?.state},
                    {deliveryAddress?.country},{deliveryAddress?.pinCode}
                  </p>
                </div>
              ) : (
                "No Address Selected"
              )}
            </div>
            <div>
              <button onClick={()=>displayRazorpay()} disabled={deliveryAddress===null}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
