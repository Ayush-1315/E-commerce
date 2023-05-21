import axios from "axios"
export const productDetails=async()=>{
  try{
    const response=await axios.get("/api/products/c2b6d61f-97f6-48b1-afd8-b4df0789bd2a");
    // console.log(response)
  } 
  catch(e){
    console.log(e);
  }
 
}