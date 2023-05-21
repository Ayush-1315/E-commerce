import axios from "axios";
export const getCart = async () => {
  const encodedToken = localStorage.getItem("token");
  try {
    const response = await axios.get("/api/user/cart", {
      headers: { authorization: encodedToken },
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
};
