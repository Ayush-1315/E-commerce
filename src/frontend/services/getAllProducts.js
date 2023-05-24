import axios from "axios";
export const getProducts=async()=>{
    try{
        const response=await axios.get("/api/products");
        return response.data.products;
    }
    catch(e){
        console.log(e);
    }
}