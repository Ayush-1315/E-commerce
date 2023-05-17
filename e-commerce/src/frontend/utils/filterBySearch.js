import { filterCategory } from "./filterByCategory";
import { pricedProducts } from "./filterByMaxPrice";
import { ratedProducts } from "./filterByRating";
import { sortedProducts } from "./sortProducts";

export const filterProducts = (allProducts, filters) => {
  const { search: searchString, categories,maxPrice,rating,sortBy} = filters;
  //   if (searchString !== "")
  //     return filterCategory(
  //       allProducts.filter((product) => {
  //         const { title, category } = product;
  //         return (
  //           title.toLowerCase().includes(searchString) ||
  //           category.toLowerCase().includes(searchString)
  //         );
  //       })
  //     );
  //   return allProducts;
  const foundProducts =
    searchString !== ""
      ? allProducts.filter((product) => {
          const { title, category } = product;
          return (
            title.toLowerCase().includes(searchString) ||
            category.toLowerCase().includes(searchString)
          );
        })
      : allProducts;
console.log(maxPrice);
 const categorizedProducts= filterCategory(foundProducts, categories);
 const rangedProducts=pricedProducts(categorizedProducts,maxPrice);
 const rateProducts=ratedProducts(rangedProducts,rating);
 return sortedProducts(rateProducts,sortBy);


};
