import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import { getProducts } from "../services/getAllProducts";
import { getCategories } from "../services/getCategories";
import {
  initialFilter,
  filterReducerFunction,
} from "../reducers/filterReducer";
import { filterProducts } from "../utils/filterBySearch";
export const ProductsContext = createContext();
export const ProductsProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(
    filterReducerFunction,
    initialFilter
  );
  const [sideMenu,setSideMenu]=useState({
    menu:false,
    sidemenu:false
  });
  const [products, setProducts] = useState({
    showProducts: [],
    receivedProducts: [],
  });
const [allCategories,setCategories]=useState([]);
  useEffect(() => {
    (async () => {
      const response = await getProducts();
      const categoies=await getCategories();
      setProducts({
        showProducts: response,
        receivedProducts: response,
      });
      setCategories([...categoies]);
    })();
  }, []);
  const {receivedProducts } = products;
  const filtered=filterProducts(receivedProducts,filterState);
  return (
    <ProductsContext.Provider
      value={{ filtered, filterDispatch, filterState,receivedProducts,allCategories,sideMenu,setSideMenu}}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);
