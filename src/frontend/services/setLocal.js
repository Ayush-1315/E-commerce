export const setData = (
  firstName,
  lastName,
  email,
  gender,
  phone,
  city,
  state,
  country,
  pin,
  encodedToken
) => {
  localStorage.setItem("token", encodedToken);
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("email", email);
  localStorage.setItem("gender", gender);
  localStorage.setItem("city", city);
  localStorage.setItem("state", state);
  localStorage.setItem("country", country);
  localStorage.setItem("pin", pin);
  localStorage.setItem("phone", phone);
};
