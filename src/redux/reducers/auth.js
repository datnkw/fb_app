import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  isLogin: false,
  name: '',
  avatar: '',
  token: ''
};

export default function(state = initialState, action) {
  console.log("action type in auth reducer: ", action.type);
  switch (action.type) {
    case LOGIN: {
      const { name, avatar, token } = action.payload;
      console.log("name: ", name);
      return {
        ...state,
        name,
        token,
        avatar,
        isLogin: true
      };
    }
    case LOGOUT: {
      return {
        ...state,
        name: '',
        token: '',
        avatar: '',
        isLogin: false
      };
    }
    default:
      return state;
  }
}