import axios from "axios";
export const getCart = async (encodedToken) => {
  try {
    const response = await axios.get("/api/user/cart", {
      headers: { authorization: encodedToken },
    });
    const{status,data}=response
    if(status===200){
      return data?.cart;
    }
  } catch (e) {
    return [];
  }
};
