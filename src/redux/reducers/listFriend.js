import { INIT_FRIEND_LIST, EDIT_INFO, TOGGLE_FRIEND_QUALITY } from "../actionTypes";

const initialState = {};

const convertFriendListToState = (friendList) => {
  const result = {};
  friendList.map((value, index) => {
    result[index] = {
      ...value,
      nickname: '',
      description: '',
      isGoodFriend: false
    }
  })

  return result;
}

export default function(state = initialState, action) {
  console.log("action type: ", action.type);
  switch (action.type) {
    case INIT_FRIEND_LIST: {
      
      const friendListObject = convertFriendListToState(action.payload.friendList);
      console.log("friendListObject: ", friendListObject);
      return {
        ...state,
        ...friendListObject
      };
    }
    case TOGGLE_FRIEND_QUALITY: {
      const {id} = action.payload;

      console.log("id: ", id);
      console.log("state: ", state);

      return {
        ...state,
        [id]: {
          ...state[id],
          isGoodFriend: !state[id].isGoodFriend
        }
      };
    }
    case EDIT_INFO: {
      const {id, nickname, description, isGoodFriend} = action.payload;
      console.log("info in reducer: ", action.payload);
      console.log("id: ", id);
      
      return {
        ...state,
        [id]: {
          ...state[id],
          nickname,
          description,
          isGoodFriend
        }
      };
      
    }
    default:
      return state;
  }
}