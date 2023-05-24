import axios from "axios";
export const decreaseQty = async (productId, encodedToken) => {
  try {
    const {status,data} = await axios.post(
      `/api/user/cart/${productId}`,
      { action: { type: "decrement" } },
      { headers: { authorization: encodedToken } }
    );
    if(status===200){
      return data?.cart;
    }
  } catch (e) {
    console.log(e);
  }
};
