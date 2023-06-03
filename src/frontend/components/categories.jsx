import { Link } from "react-router-dom";
import { useProducts } from "../context/productsContext";
export const Categories = () => {
  const {filterDispatch,allCategories,setSideMenu,sideMenu}=useProducts();
  const categoriesClickHandler=(value)=>{
    filterDispatch({type:"SORT_BY_CATEGORY",payload:value})
    setSideMenu({...sideMenu,menu:true});
  }
    return (
    <div>
      <ul className="categoryContainer">
        {allCategories.map(({ category, icon,value }, index) => (
          <li key={index}>
            <Link to={`/products`} onClick={()=>categoriesClickHandler(value)}>
              <img src={icon} alt={category} className="categoryIcon" />
              <span className="categoryType">{category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
