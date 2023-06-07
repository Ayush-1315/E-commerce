import { ProductCard } from "../../components/productCard";
import { useProducts } from "../../context/productsContext";
import { Filters } from "../../components/filters";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect,useRef} from "react";
import SearchError from "../../../images/notFound.png";
import "./products.css";
export const Products = () => {
  const { string } = useParams();
  const { filterDispatch,sideMenu} = useProducts();
  const dispatchFunction=useRef(filterDispatch);
  const searchString=useRef(string);
  // const [windowSize,setWindowSize]=useState([window.innerWidth]);
  useEffect(() => {
    if (searchString.current !== "" && searchString.current !== undefined) {
      dispatchFunction.current({ type: "FILTER_BY_SEARCH", payload: searchString.current});
    }
    document.title="Products | ShopsyCart";
    window.scrollTo(0,0);
    // const handleWindowResize = () => {
    //   setWindowSize([window.innerWidth]);
    // };

    // window.addEventListener('resize', handleWindowResize);
   
    // return () => {
    //   window.removeEventListener('resize', handleWindowResize);
    // };
  }, []);
  // console.log(windowSize);
  // if(windowSize[0]<768){
  //   set
  // }
  const { filtered } = useProducts();
  const {sidemenu}=sideMenu;
  return (
    <div style={{ display: "flex",minHeight:"72vh"}}>
      <div className="sideBar">
      <Filters />
      </div>
      {filtered?.length !== 0 ? (<>
        <ul className="productsHolder" style={{display:sidemenu?"none":"flex"}}>
          {filtered?.map((product, index) => (
            <ProductCard product={product} key={index} />
          ))}
        </ul>
        </>
      ) : (
        <div className="search-error">
          <img src={SearchError} alt="search Error" />
        <h1>No matches found</h1>
        <Link to="/" onClick={()=>filterDispatch({ type: "RESET_FILTERS" })}>Go Back</Link>
        </div>
      )}
    </div>
  );
};
