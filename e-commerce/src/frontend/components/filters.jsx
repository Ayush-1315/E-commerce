import { useProducts } from "../context/productsContext";
export const Filters = () => {
  const { filterDispatch, filterState } = useProducts();
  const {categories:filterCategories}=filterState;
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
  const rating = [1, 2, 3, 4];
  console.log(filterState);
 console.log( filterState.categories.length!==0)
  return (
    <div style={{ width: "30vw", minHeight: "100vh" }}>
      <form action="#">
        <span className="filterPrice">Price</span>
        <input
          type="range"
          min="10000"
          max="100000"
          step="10000"
          onChange={(e) =>
            filterDispatch({ type: "SET_MAX_PRICE", payload: e.target.value })
          }
          value={filterState.maxPrice}
        />
        <span>Category</span>
        {categories.map(({ category, value }, index) => (
          <span
            style={{ display: "block", textAlign: "left", margin: "0 0.5rem" }}
          >
            <input
              key={index}
              type="checkbox"
              value={value}
              id={category}
              name={category}
              onChange={() =>
                filterDispatch({ type: "SORT_BY_CATEGORY", payload: value })
              }
              checked={filterState.categories.includes(value)}
            />
            <label htmlFor={category}>{category}</label>
          </span>
        ))}
        <span>Rating</span>
        {rating.map((rating) => (
          <span
            style={{ display: "block", textAlign: "left", margin: "0 0.5rem" }}
          >
            <input
              type="radio"
              id={rating}
              value={rating}
              name="rating"
              onChange={() =>
                filterDispatch({ type: "SORT_BY_RATING", payload: rating })
              }
            />
            <label htmlFor={rating}>{rating} Stars & above</label>
          </span>
        ))}
        <span>Sort By Price</span>
        <span
          style={{ display: "block", textAlign: "left", margin: "0 0.5rem" }}
        >
          <input
            type="radio"
            id="low"
            value="low"
            name="price"
            onChange={() =>
              filterDispatch({ type: "SORT_BY_PRICE", payload: "low" })
            }
          />
          <label htmlFor="low">Low to High</label>
        </span>
        <span
          style={{ display: "block", textAlign: "left", margin: "0 0.5rem" }}
        >
          <input
            type="radio"
            id="high"
            value="low"
            name="price"
            onChange={() =>
              filterDispatch({ type: "SORT_BY_PRICE", payload: "high" })
            }
          />
          <label htmlFor="high">High to Low</label>
        </span>
        <input
          type="reset"
          value="Clear Filters"
          onClick={() => filterDispatch({ type: "RESET_FILTERS" })}
        />
      </form>
    </div>
  );
};
