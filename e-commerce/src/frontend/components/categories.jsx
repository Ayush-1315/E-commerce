import { Link } from "react-router-dom";
import { useProducts } from "../context/productsContext";
export const Categories = () => {
  const {filterDispatch}=useProducts();
  const categories = [
    {
      category: "Computer accessories",
      icon: "https://bit.ly/42ZW1Y9",
      value: "computerAccessories",
    },
    {
      category: "Mobiles",
      icon: "https://bit.ly/42ZW1Y9",
      value: "mobiles",
    },
    {
      category: "Computers",
      icon: "https://bit.ly/42ZW1Y9",
      value: "computers",
    },
    {
      category: "Networking Equipments",
      icon: "https://bit.ly/42ZW1Y9",
      value: "networking",
    },
    {
      category: "Software",
      icon: "https://bit.ly/42ZW1Y9",
      value: "software",
    },
  ];
  return (
    <div>
      <ul className="categoryContainer">
        {categories.map(({ category, icon,value }, index) => (
          <li key={index}>
            <Link to={`/products`} onClick={()=>filterDispatch({type:"SORT_BY_CATEGORY",payload:value})}>
              <img src={icon} alt={category} className="categoryIcon" />
              <span className="categoryType">{category}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
