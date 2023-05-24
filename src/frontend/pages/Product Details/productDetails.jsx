// import "../Product Details/productDetails.css"
import { useState,useEffect } from "react";
import { useParams } from "react-router";
import { productDetails } from "../../services/getProductDetails";
import { ProductDetailCard } from "../../components/product";
import { Loader } from "../../components/loader";
export const Product = () => {
  const [product,setProduct]=useState();
  const { productID } = useParams();
  useEffect(()=>{
    (async()=>{
        try{
            const response=await productDetails(productID);
            setProduct(response);
        }
        catch (e){
            console.log(e);
        }
    })()
  },[]);       

  return <>
 {product!==undefined ?<ProductDetailCard product={product}/>:<Loader/>}
  </>;
};
