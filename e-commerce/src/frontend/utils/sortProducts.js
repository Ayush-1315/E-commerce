export const sortedProducts=(allProducts,sortBy)=>{
    return sortBy !== ""
      ? sortBy === "low"
        ? allProducts.sort((a, b) =>
            parseFloat(a.price.replace(",", "")) <
            parseFloat(b.price.replace(",", ""))
              ? -1
              : parseFloat(a.price.replace(",", "")) >
                parseFloat(b.price.replace(",", ""))
              ? 1
              : 0
          )
        : allProducts.sort((a, b) =>
            parseFloat(a.price.replace(",", "")) >
            parseFloat(b.price.replace(",", ""))
              ? -1
              : parseFloat(a.price.replace(",", "")) <
                parseFloat(b.price.replace(",", ""))
              ? 1
              : 0
          )
      : allProducts;
}