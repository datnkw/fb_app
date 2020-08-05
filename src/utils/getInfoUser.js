const FB = window.FB;

const getAllInfo = (userId) => new Promise(resolve => {
  const url = '/' + userId + '?fields=name,email,picture';

  FB.api(
    url,
    response => {
      if(response && !response.error) {
        resolve({
          name: response.name,
          avatar: response.picture.data.url,
          email: response.email
        })
      }
    }
  )
});

const getFriendList = (userId) => new Promise(resolve => {
  const url = '/' + userId + '/friends'

  FB.api(
    url,
    'GET',
    {},
    function(response) {
    console.log('response get friend list: ', response);
     resolve(response.data);
    }
  );

});

const getAvatar = (userId) => new Promise(resolve => {
  const url = '/' + userId + '/picture?redirect=false'

  FB.api(
    url,
    'GET',
    {},
    function(response) {
    resolve(response.data.url);
    }
  );
});

const getInfoUser = async (userId) => {
    const {name, avatar, email} = await getAllInfo(userId);
      const friendList = await getFriendList(userId);

      const avatars = await Promise.all(
        friendList.map(f => getAvatar(f.id))
      );
      const friendListAfterAddAvatar = friendList.map((f, index) => ({
        ...f,
        avatar: avatars[index],
      }));

    return {
        name,
        avatar,
        email,
        friendListAfterAddAvatar
    }
}

export default getInfoUser;