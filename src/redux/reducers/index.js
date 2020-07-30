import { combineReducers } from "redux";
import auth from "./auth";
import listFriend from "./listFriend";

export default combineReducers({ auth, listFriend });