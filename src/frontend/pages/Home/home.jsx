import { useEffect} from "react";
import { Categories } from "../../components/categories";
import { Slider } from "../../components/productSlider";
import { Arrivals } from "../../components/arrivals";
import { useProducts } from "../../context/productsContext";
import { Loader } from "../../components/loader";
import "../Home/home.css"

export const Home = () => {
  const { allCategories,filterDispatch } = useProducts();
  
  useEffect(() => {
    window.scrollTo(0,0);
    document.title = "ShopsyCart";
    filterDispatch({ type: "RESET_FILTERS" });
  },[filterDispatch]);
  
  return (
    <div>
      {allCategories.length===0?<Loader/>:
        <>
          <Slider />
          <Categories />
          <Arrivals />
        </>
      }
    </div>
  );
};
;