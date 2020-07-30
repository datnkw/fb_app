export const getFriendList = store => Object.keys(store.listFriend);

export const getFriendById = (store, id) => store.listFriend[id];