export const ratedProducts=(allProducts,minRating)=>{
    return allProducts.filter(({rating})=>parseFloat(rating)>=minRating);
}