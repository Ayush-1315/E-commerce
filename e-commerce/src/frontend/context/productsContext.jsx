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
  const { sortBy, categories, rating, maxPrice, search } = filterState;
  useEffect(() => {
    (async () => {
      const response = await getProducts();
      // console.log(response);
      setProducts({
        showProducts: response,
        receivedProducts: response,
      });
    })();
  }, []);
  const { showProducts,receivedProducts } = products;
  
  // const categoryFilter = (categories.length!=0)?(showProducts.filter((product) => {
  //   // console.log(parseInt(product.price))
  //   if (
  //     categories.includes(product.category) &&
  //     product.rating > rating &&
  //     parseInt(product.price.replace(",", "")) <= parseInt(maxPrice)
  //   )
  //     return true;
  //   return false;
  // })):receivedProducts;
  
  // const sortedProducts =
  //   sortBy !== ""
  //     ? sortBy === "low"
  //       ? categoryFilter.sort((a, b) =>
  //           parseFloat(a.price.replace(",", "")) <
  //           parseFloat(b.price.replace(",", ""))
  //             ? -1
  //             : parseFloat(a.price.replace(",", "")) >
  //               parseFloat(b.price.replace(",", ""))
  //             ? 1
  //             : 0
  //         )
  //       : categoryFilter.sort((a, b) =>
  //           parseFloat(a.price.replace(",", "")) >
  //           parseFloat(b.price.replace(",", ""))
  //             ? -1
  //             : parseFloat(a.price.replace(",", "")) <
  //               parseFloat(b.price.replace(",", ""))
  //             ? 1
  //             : 0
  //         )
  //     : categoryFilter;
  // console.log(sortedProducts);


  // let sortedProducts = categoryFilter;
  // if (sortBy === "") {
  //   sortedProducts = categoryFilter;
  // } else {
  //   if (sortBy === "low") {
  //     sortedProducts = sortedProducts.sort(
  //       (a, b) => parseInt(a.price) - parseInt(b.price)
  //     );
  //   } else {
  //     sortedProducts = sortedProducts.sort(
  //       (a, b) => parseInt(b.price) - parseInt(a.price)
  //     );
  //   }
  // }
  // console.log(categoryFilter);
  // console.log(sortedProducts);
  const filtered=filterProducts(receivedProducts,filterState);
  console.log("S1",filtered);
  return (
    <ProductsContext.Provider
      value={{ filtered, filterDispatch, filterState }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
export const useProducts = () => useContext(ProductsContext);
