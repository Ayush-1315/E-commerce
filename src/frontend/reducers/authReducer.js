const initialUser = {
  firstName: localStorage.getItem("firstName"),
  lastName: localStorage.getItem("lastName"),
  gender: localStorage.getItem("gender"),
  email: localStorage.getItem("email"),
  phone: localStorage.getItem("phone"),
  address: {
    city: localStorage.getItem("city"),
    state: localStorage.getItem("state"),
    country: localStorage.getItem("country"),
    pin: localStorage.getItem("pin"),
  },
  loginStatus: localStorage.getItem("token") ? true : false,
};
const authReducerFun = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOAD_DATA":
      return initialUser;
    case "LOG_USER":
    return {...payload};
    case "LOG_OUT":
        localStorage.clear();
        return {
            firstName: "",
            lastName: "",
            gender: "",
            email: "",
            phone: "",
            address: {
              city: "",
              state: "",
              country: "",
              pin: "",
            },
            loginStatus:false,
        }
    case "SIGN_UP":return {...state,...payload};
    default: return {...state};
  }
};
export { initialUser, authReducerFun };
