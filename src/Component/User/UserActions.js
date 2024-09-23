// import ACTIONS from "./UserActionsType";
// import setAuthToken from "./setAuthToken";

// export const login = (params = {}) => {
//   localStorage.setItem("token", params.token);
//   localStorage.setItem("user_id", params.user?.id);
//   setAuthToken(localStorage.getItem("token"));
//   return {
//     type: ACTIONS.SIGN_UP,
//     payload: params.user,
//   };
// };

// export const fetchUser = (params = {}) => {
//   // console.log("I AM HERE", params);
//   return {
//     type: ACTIONS.FETCH_USER_REQUEST,
//     payload: params,
//   };
// };

// export const fetchEvents = (params = {}) => {
//   return {
//     type: ACTIONS.FETCH_EVENTS,
//   };
// };

// export const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user_id");
//   window.location.pathname = "/";
//   return {
//     type: ACTIONS.LOGOUT,
//   };
// };
