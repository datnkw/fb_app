import { LOGIN, LOGOUT } from "../actionTypes";

const initialState = {
  isLogin: false,
  name: '',
  avatar: '',
  email: '',
  token: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        ...action.payload,
        isLogin: true
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...initialState
      };
    }
    default:
      return state;
  }
}