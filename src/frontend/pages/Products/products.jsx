import { ProductCard } from "../../components/productCard";
import { useProducts } from "../../context/productsContext";
import { Filters } from "../../components/filters";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect,useRef } from "react";
import SearchError from "../../../images/notFound.png";
import "./products.css";
export const Products = () => {
  const { string } = useParams();
  const { filterDispatch } = useProducts();
  const dispatchFunction=useRef(filterDispatch);
  const searchString=useRef(string);
  useEffect(() => {
    if (searchString.current !== "" && searchString.current !== undefined) {
      dispatchFunction.current({ type: "FILTER_BY_SEARCH", payload: searchString.current});
    }
    document.title="Products | ShopsyCart";
    window.scrollTo(0,0);
  }, []);
  const { filtered } = useProducts();
  return (
    <div style={{ display: "flex",minHeight:"72vh"}}>
      <Filters />
      {filtered?.length !== 0 ? (<>
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
