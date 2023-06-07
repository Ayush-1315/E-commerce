import "./component CSS/orderHistoryCard.css";
export const OrderHistoryCard = ({
  orderId,
  transactionId,
  price,
  items,
  deliverTo,
}) => {
  const { firstName, lastName, city, state, country, phone, email, pinCode } =
    deliverTo;
  return (
    <div className="order-card">
      <div className="order-card-head">
        <p>
         <h3> <span>Order ID:</span>
          {orderId}</h3>
        </p>
        <p>
          <span>Transaction ID:</span>
          {transactionId}
        </p>
      </div>
      <div className="order-card-body">
        {items.map(({ title, qty, offerPrice, image }) => (
          <div key="index" className="order-items">
            <div>
              <div>
                <p className="order-product-title">{title}</p>
                <div>
                  <p><strong>Quantity:</strong> {qty}</p>
                  <p><strong>Price:</strong> ₹{offerPrice}</p>
                </div>
              </div>
              <div>
                <img src={image} alt="product" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="order-card-footer">
        <div className="shipping-address">
          <p>Delivered To </p>
          <p className="">
            {firstName} {lastName}
          </p>
          <p className="">{email}</p>
          <p className="">
            <strong>Ph:</strong> {phone}
          </p>
          <p className="">
            <strong>Address:</strong> {city},{state},{country},{pinCode}
          </p>
        </div>
        <div className="order-card-price">
          <p>Total Value: ₹{price?.totalPrice}</p>
        </div>
      </div>
    </div>
  );
};
