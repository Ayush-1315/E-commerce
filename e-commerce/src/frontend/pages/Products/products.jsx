import { ProductCard } from "../../components/productCard";
import { useProducts } from "../../context/productsContext";
import { Filters } from "../../components/filters";
import { useParams } from "react-router";
import { useEffect } from "react";

import "./products.css";
export const Products = () => {
  const { string } = useParams();
  const { filterDispatch } = useProducts();
  useEffect(() => {
    if (string !== "" && string !== undefined) {
      filterDispatch({ type: "FILTER_BY_SEARCH", payload: string});
    }
  }, []);
  const { filtered } = useProducts();
  return (
    <div style={{ display: "flex" }}>
      <Filters />
      {filtered?.length !== 0 ? (
        <ul className="productsHolder">
          {filtered?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </ul>
      ) : (
        <h1>Nothing to show here...</h1>
      )}
    </div>
  );
};
