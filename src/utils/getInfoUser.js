const FB = window.FB;

export const getAllInfo = (userId) => new Promise(resolve => {
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

export const getFriendList = (userId) => new Promise(resolve => {
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

export const getAvatar = (userId) => new Promise(resolve => {
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