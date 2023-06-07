export const filterCategory=(allProducts,categories)=>{
    if(categories.length!==0){
        return allProducts.filter(({category})=>categories.includes(category))
    }
    else return allProducts
}