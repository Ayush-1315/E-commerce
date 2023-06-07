import axios from "axios";
export const getCategories = async () => {
  try {
    const response = await axios.get("/api/categories");
    const{status,data}=response
    if(status===200){
      return data?.categories;
    
    }
  } catch (e) {
    console.log(e);
  }
};
