import axios from "axios"
export const addProductToCart=async(product,encodedToken)=>{
    try{
        const {status,data}=await axios.post("/api/user/cart",
        {product},
        {headers: { authorization: encodedToken }}
        );
        if(status===201)
        return data?.cart;
        
    }
    catch(e){
        console.log(e);
    }
}