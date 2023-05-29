export const sortedProducts=(allProducts,sortBy)=>{
    return sortBy !== ""
      ? sortBy === "low"
        ? allProducts.sort((a, b) =>
            parseFloat(a.offerPrice.replaceAll(",", "")) <
            parseFloat(b.offerPrice.replaceAll(",", ""))
              ? -1
              : parseFloat(a.offerPrice.replaceAll(",", "")) >
                parseFloat(b.offerPrice.replaceAll(",", ""))
              ? 1
              : 0
          )
        : allProducts.sort((a, b) =>
            parseFloat(a.offerPrice.replaceAll(",", "")) >
            parseFloat(b.offerPrice.replaceAll(",", ""))
              ? -1
              : parseFloat(a.offerPrice.replaceAll(",", "")) <
                parseFloat(b.offerPrice.replaceAll(",", ""))
              ? 1
              : 0
          )
      : allProducts;
}