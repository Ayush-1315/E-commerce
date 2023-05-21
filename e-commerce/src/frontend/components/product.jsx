import "./component CSS/productDetailCard.css"
export const ProductDetailCard = ({ product }) => {
  const {
    category,
    features,
    discount,
    id,
    image,
    offerPrice,
    price,
    rating,
    seller,
    title,
  } = product;
  const featuresList=Object.entries(features);
  return(
  <>
    <div className="detailCard">
        <div className="imageHolder">
      <img src={image} alt={title} className="productDetailImage" />
      </div>
      <div className="detailsHolder">
        <h2>{title}</h2>
        <p>{category}</p>
        <p>
          <span className="offer">₹{offerPrice}</span> <span className="price">₹{price}</span>{" "}
          <span className="discount">{discount}</span>
        </p>
        <p>Raings: {rating}</p>
        <p>Seller: {seller}</p>
        <button className="btn">Add to Cart</button>
        <button className="btn">Add to Wishlist</button>
      </div>
    </div>
    <div className="featuresTable">
        <h2>Product Details</h2>
        {featuresList.map((feature,index)=><p id={index} className="featureEntry">
            <span className="feature">{feature[0]}</span><span className="featureValue">{feature[1]}</span>
        </p>)}
    </div>
  </>);
};
