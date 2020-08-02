import { LOGIN, LOGOUT } from "../actionTypes";

export const login = ({name, avatar, token}) => { 
  console.log("name in action: ", name);
  return ({
  type: LOGIN,
  payload: {
    name, 
    token,
    avatar
  }
});
}

export const logout = () => ({
  type: LOGOUT
})