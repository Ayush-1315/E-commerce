// import "../Product Details/productDetails.css"
import { useState,useEffect,useRef } from "react";
import { useParams } from "react-router";
import { productDetails } from "../../services/getProductDetails";
import { ProductDetailCard } from "../../components/product";
import { Loader } from "../../components/loader";
export const Product = () => {
  const [product,setProduct]=useState();
  const { productID } = useParams();
  const S_Id=useRef(productID)
  useEffect(()=>{
    (async()=>{
        try{
            const response=await productDetails(S_Id.current);
            setProduct(response);
            document.title=`${response?.title} | ShopsyCart`;
        }
        catch (e){
            console.log(e);
        }
    })()
    window.scrollTo(0,0);
  },[]);       

  return <>
 {product!==undefined ?<ProductDetailCard product={product}/>:<Loader/>}
  </>;
};
