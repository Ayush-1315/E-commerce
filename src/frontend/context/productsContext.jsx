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
  console.log(receivedProducts);
  return (
    <ProductsContext.Provider
      value={{ filtered, filterDispatch, filterState,receivedProducts,allCategories }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);
