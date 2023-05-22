import axios from "axios"
export const addProductToWishlist=async(product,encodedToken)=>{
    try{
        const {status,data}=await axios.post("/api/user/wishlist",
        {product},
        {headers: { authorization: encodedToken }}
        );
        if(status===201)
        return data?.wishlist;
        
    }
    catch(e){
        console.log(e);
    }
}