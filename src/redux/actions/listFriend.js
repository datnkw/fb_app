import { INIT_FRIEND_LIST, EDIT_INFO, TOGGLE_FRIEND_QUALITY } from "../actionTypes";

export const initFriendList = (friendList) => {
  return ({
  type: INIT_FRIEND_LIST,
  payload: {
    friendList
  }
})};

export const toggleFriendQuality = (id) => ({
  type: TOGGLE_FRIEND_QUALITY,
  payload: {
    id
  }
});

export const editInfo = (id, info) => ({
  type: EDIT_INFO,
  payload: {
    id,
    ...info
  }
})