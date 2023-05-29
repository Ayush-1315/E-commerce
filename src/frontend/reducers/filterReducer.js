const initialFilter = {
  sortBy: "",
  categories: [],
  rating: 1,
  maxPrice:170000,
  search: "",
};
const filterReducerFunction = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FILTER_BY_SEARCH":
      return { ...state, search: payload.trim().toLowerCase() };
    case "SORT_BY_PRICE":
      return { ...state, sortBy: payload };
    case "SORT_BY_CATEGORY":
      if (state.categories.includes(payload))
        return {
          ...state,
          categories: state.categories.filter(
            (category) => category !== payload
          ),
        };
      else return { ...state, categories: [...state.categories, payload] };
    case "SORT_BY_RATING":
      return { ...state, rating: payload };
    case "SET_MAX_PRICE":
      return { ...state, maxPrice: payload };
    case "RESET_FILTERS":
      return { ...initialFilter };
    default:
      return state;
  }
};
export { initialFilter, filterReducerFunction };
