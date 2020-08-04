import { INIT_FRIEND_LIST, EDIT_INFO, TOGGLE_FRIEND_QUALITY } from "../actionTypes";

const initialState = {};

const convertFriendListToState = (friendList = []) => {
  friendList.forEach(item => console.log(item))
  const result = friendList.reduce((prev, cur, index) => {

    prev[index] = {
      name: cur.name,
      avatar: cur.avatar
    };
    return prev;
  }, {});

  return result
}

export default function(state = initialState, action) {
  switch (action.type) {
    case INIT_FRIEND_LIST: {
      
      const friendListObject = convertFriendListToState(action.payload.friendList);
      // console.log("friendListObject: ", friendListObject, action);
      return {
        // ...state,
        ...friendListObject
      };
    }
    case TOGGLE_FRIEND_QUALITY: {
      const {id} = action.payload;


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