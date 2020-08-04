import { LOGIN, LOGOUT } from "../actionTypes";

export const login = ({name, avatar, token}) => { 
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