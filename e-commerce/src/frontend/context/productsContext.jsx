import {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import { getProducts } from "../services/getAllProducts";
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

  useEffect(() => {
    (async () => {
      const response = await getProducts();
      setProducts({
        showProducts: response,
        receivedProducts: response,
      });
    })();
  }, []);
  const {receivedProducts } = products;
  const filtered=filterProducts(receivedProducts,filterState);
  return (
    <ProductsContext.Provider
      value={{ filtered, filterDispatch, filterState,receivedProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);
