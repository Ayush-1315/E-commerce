import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuid } from "uuid";
import { useCart } from "../../context/cartContext";
import { useUser } from "../../context/userContext";
import "./orderSummary.css";
import { AddressForm } from "../../components/addressForm";
import { notify } from "../../../App";

export const OrderSummary = () => {
  //    console.log(uuid());
  const { cartState, resetCart } = useCart();
  const [itemsList, setItemsList] = useState([]);
  const { addresses, orders, setOrders } = useUser();
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [addNewAddress, setNewAddress] = useState(false);
  // const selectedAddress=(e)=>{}
  const [selectAddress, setSelectAddress] = useState(null);
  const addressChange = (e) => {
    setDeliveryAddress(addresses[e.target.value]);
    setSelectAddress(e.target.value);
  };
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
      // rzp_test_4hPkeR34PzPm3M
      key: "rzp_test_4hPkeR34PzPm3M",
      amount: Number(priceDetails.totalPrice) * 100,
      currency: "INR",
      name: "ShopsyCart",
      description: "Thank you for shopping with us",
      handler: function (response) {
        notify(`Payment of Rs. ${priceDetails.totalPrice} is Succesful`);
        setOrders([
          ...orders,
          {
            orderId: uuid(),
            transactionId: response.razorpay_payment_id,
            items: itemsList,
            price: priceDetails,
            deliverTo: deliveryAddress,
          },
        ]);
        navigate("/success");
        setTimeout(() => {
          console.log("Success");
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
              <label
                htmlFor={index}
                key={index}
                className="checkoutAddresses"
                style={{
                  border: `2px solid ${
                    selectAddress === index ? "var(--color)" : "'#32635b':"
                  }`,
                }}
              >
                <input
                  type="radio"
                  id={index}
                  name="deliveryAddress"
                  onChange={addressChange}
                  value={index}
                />
                <div>
                  <p className="deliveryName">
                    {address?.firstName} {address?.lastName}
                  </p>
                  <p className="deliveryMail">{address?.email}</p>
                  <p className="deliveryPhone">
                    <span>Ph:</span>
                    {address?.phone}
                  </p>
                  <div className="deliveryAddress">
                    <span>Address:</span>
                    <p>
                      {address?.city},{address?.state},{address?.country},
                      {address?.pinCode}
                    </p>
                  </div>
                </div>
              </label>
            ))}
            <AddressForm
              showForm={addNewAddress}
              setFormFun={(val) => setNewAddress(val)}
              updateIndex={-1}
            />
            <button
              onClick={() => setNewAddress(true)}
              className="addAddressBtn"
            >
              + Add new Address
            </button>
          </div>
          <div className="priceDetailsComponent">
            <div className="priceHead">Order Details</div>
            <div className="price-listing">
              <span>Item</span>
              <span>Qty.</span>
              <span>Price</span>
            </div>
            {itemsList.map((item, index) => (
              <div key={index} className="summary-listed-item">
                <p className="summary-item">
                  {item?.title} X 
                </p>
                <p className="summary-item-qty">
                {item?.qty}
                </p>
                <p className="summary-item-price">
                  ₹
                  {parseInt(item?.offerPrice.replaceAll(",", "")) *
                    parseInt(item?.qty)}
                </p>
              </div>
            ))}
            <div className="price-footer">
              <p><span>Sub total: </span><span>₹{priceDetails?.price}</span></p>
              <p><span>Discount:</span> <span>-₹{priceDetails?.discount}</span></p>
              <p><span>Grand Total:</span> <span>₹{priceDetails?.totalPrice}</span></p>
            </div>
            <div className="deliver-to">Shippment Address</div>
            <div>
              {deliveryAddress ? (
                <div className="shipment-address">
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
              <button
                onClick={() => displayRazorpay()}
                disabled={deliveryAddress === null}
                className="order-place-btn"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
