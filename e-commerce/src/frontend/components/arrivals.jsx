
import { Link } from "react-router-dom";
import "./component CSS/arrivals.css";
import { useProducts } from "../context/productsContext";

export const Arrivals = () => {
  const { receivedProducts } = useProducts();

  console.log(receivedProducts);
  const getArrivals=()=>receivedProducts[Math.floor(Math.random() * receivedProducts.length)];
  const product1 =getArrivals();
  const product2 =getArrivals();
  const product3 =getArrivals();
  const product4 =getArrivals();
  const product5 =getArrivals();
  const arrivalProducts=[product1,product2,product3,product4,product5];
  
  return <>
  <h2>Have look at our arrivals</h2>
    <div className="arrivalContainer">
   {
    arrivalProducts.map((product,index)=><div className="arrivals" key={index}>
        <Link to={`/products/${product?._id}`}>
        <img src={product?.image} alt="product" />
        <div className="overlay">
            <div>
            <span>{product?.discount}</span>
            <p>{product?.category}</p>
            </div>
        </div>
        </Link>
    </div>)
   }
    </div>
  </>
};
