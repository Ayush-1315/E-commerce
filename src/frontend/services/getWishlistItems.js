import axios from "axios";
export const getWishList=async(encodedToken)=>{
    try {
        const response = await axios.get("/api/user/wishlist", {
          headers: { authorization: encodedToken },
        });
        const{status,data}=response
        if(status===200){
          return data?.wishlist;
        }
      } catch (e) {
        return [];  
      }
}