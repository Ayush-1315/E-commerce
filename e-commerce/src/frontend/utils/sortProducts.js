export const sortedProducts=(allProducts,sortBy)=>{
    return sortBy !== ""
      ? sortBy === "low"
        ? allProducts.sort((a, b) =>
            parseFloat(a.offerPrice.replace(",", "")) <
            parseFloat(b.offerPrice.replace(",", ""))
              ? -1
              : parseFloat(a.offerPrice.replace(",", "")) >
                parseFloat(b.offerPrice.replace(",", ""))
              ? 1
              : 0
          )
        : allProducts.sort((a, b) =>
            parseFloat(a.offerPrice.replace(",", "")) >
            parseFloat(b.offerPrice.replace(",", ""))
              ? -1
              : parseFloat(a.offerPrice.replace(",", "")) <
                parseFloat(b.offerPrice.replace(",", ""))
              ? 1
              : 0
          )
      : allProducts;
}