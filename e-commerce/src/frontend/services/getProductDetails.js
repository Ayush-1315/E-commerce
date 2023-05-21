import axios from "axios"
export const productDetails=async(productID)=>{
  try{
    const response=await axios.get(`/api/products/${productID}`);
    return(response?.data?.product);
  } 
  catch(e){
    console.log(e);
  }
 
}