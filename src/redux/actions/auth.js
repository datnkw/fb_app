import { LOGIN, LOGOUT } from "../actionTypes";

export const login = (info) => { 
  console.log("info in action auth: ", info);
  return ({
  type: LOGIN,
  payload: {
    ...info
  }
});
}

export const logout = () => ({
  type: LOGOUT
})