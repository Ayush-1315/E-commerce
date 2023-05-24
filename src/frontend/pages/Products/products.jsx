import { ProductCard } from "../../components/productCard";
import { useProducts } from "../../context/productsContext";
import { Filters } from "../../components/filters";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import SearchError from "../../../images/notFound.png";
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
    <div style={{ display: "flex",minHeight:"72vh"}}>
      {filtered?.length !== 0 ? (<>
      <Filters />
        <ul className="productsHolder">
          {filtered?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </ul>
        </>
      ) : (
        <div>
          <img src={SearchError} alt="search Error" />
        <h1>No matches found</h1>
        <Link to="/" onClick={()=>filterDispatch({ type: "RESET_FILTERS" })}>Go Back</Link>
        </div>
      )}
    </div>
  );
};
