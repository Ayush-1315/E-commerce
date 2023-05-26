import { useEffect } from "react";
import { Categories } from "../../components/categories";
import { Slider } from "../../components/productSlider";
import { Arrivals } from "../../components/arrivals";
import { useProducts } from "../../context/productsContext";
import { Loader } from "../../components/loader";
export const Home = () => {
  useEffect(() => {
    document.title = "ShopsyCart";
  });
  const { allCategories } = useProducts();
  
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
