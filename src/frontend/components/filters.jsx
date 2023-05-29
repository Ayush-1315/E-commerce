import {useState} from 'react';
import { useProducts, } from "../context/productsContext";
export const Filters = () => {
  const { filterDispatch, filterState, allCategories } = useProducts();
  const rating = [1, 2, 3, 4];
  const [filterStateWaiter, setFilterStateWaiter] = useState(false);
//  {console.log(value,filterState.categories.includes(value))}
   return (
    <>
    {<div style={{ width: "15vw", minHeight: "100vh" }}>
      <form action="#">
        <div>
        <span className="filterPrice">Price</span><br />
        <input
          type="range"
          list="tickmark"
          min="1000"
          max="170000"
          step="1000"
          onChange={(e) =>{
            filterDispatch({ type: "SET_MAX_PRICE", payload: e.target.value })
            console.log(e.target.value);
          }
          }
          value={filterState.maxPrice}
          style={{width:"100%"}}
         />
         <datalist id="tickmark">
          <option value="1000"></option>
          <option value="20000"></option>
          <option value="40000"></option>
          <option value="60000"></option>
          <option value="80000"></option>
          <option value="100000"></option>
          <option value="120000"></option>
          <option value="140000"></option>
          <option value="170000"></option>
         </datalist>
         </div>
         <p style={{display:"flex",justifyContent:"space-between",margin:"0"}}><span>1000</span><span>170000</span></p>
        <span>Category</span>
        { !filterStateWaiter  ? allCategories.map(({ category, value }, index) => (
          <span
            style={{ display: "block", textAlign: "left", margin: "0 0.5rem" }}
            key={index}
          >
            <input
             
              type="checkbox"
              value={value}
              id={category}
              name={category}
              onChange={() =>
                filterDispatch({ type: "SORT_BY_CATEGORY", payload: value })
              }
              checked={filterState.categories.includes(value)}
            />
            {/* {JSON.stringify(filterState.categories.includes(value))} */}
           
            <label htmlFor={category}>{category}</label>
          </span>
        )) : <>Loading</>}
        <span>Rating</span>
        {rating.map((rating,index) => (
          <span
            style={{ display: "block", textAlign: "left", margin: "0 0.5rem" }}
            key={index}
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
          onClick={() =>{
            setFilterStateWaiter(true);
            setTimeout(()=>{setFilterStateWaiter(false)},0)
            filterDispatch({ type: "RESET_FILTERS" })}}
        />
      </form>
    </div>}
    </>
  );
};
