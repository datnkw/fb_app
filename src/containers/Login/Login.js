import React from "react";
import Styles from './Login.module.css';
import { connect } from "react-redux";
import { login, initFriendList } from "../../redux/actions";
import firebase from "../../utils/firebase";
import { useHistory } from 'react-router-dom';

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (info) => {
      dispatch(login(info));
    },
    onInitFriendList: (friendList) => {
      dispatch(initFriendList(...[friendList]));
    }
  }
}

const FB = window.FB;

const getLoginStatus = () => new Promise((resolve, reject) => {

  FB.getLoginStatus((response, error) => {
    if(error)
    return reject(error);
    resolve(response);
  })
});

const getLogin = () => new Promise(resolve => {
  FB.login(response => {
    resolve(response);
  }, {scope: 'email, public_profile'})
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
})

const getFriendList = (userId) => new Promise(resolve => {
  const url = '/' + userId + '/friends'

  FB.api(
    url,
    'GET',
    {},
    function(response) {
     resolve(response.data);
    }
  );

});

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
})

function Login(props) {
  const history = useHistory();
  const provider = new firebase.auth.FacebookAuthProvider();

  console.log("provider: ", provider);

  const getInfo = async () => {
    let authResponse, type;

    const getLoginStatusResponse = await getLoginStatus();

    if(getLoginStatusResponse.status === 'connected') {
      type = 'get login status';
      authResponse = getLoginStatusResponse.authResponse;
    } else {
      type = 'login';
      const rs = await getLogin();
      authResponse = rs.authResponse;
    }

    console.log('type: ', type);
    console.log("realResponse: ", authResponse);

    const token = authResponse.accessToken;
    const userId = authResponse.userID;

    const {name, avatar, email} = await getAllInfo(userId);

    const friendList = await getFriendList(userId);

    const avatars = await Promise.all(
      friendList.map(f => getAvatar(f.id))
    );
    const friendListAfterAddAvatar = friendList.map((f, index) => ({
      ...f,
      avatar: avatars[index],
    }));

    props.onLogIn({name, avatar, email, token});
    props.onInitFriendList(friendListAfterAddAvatar);
  }

  const doTheLogIn = async () => {
    await getInfo();
    console.log('done get info');
    history.push('/');
  }

    return (
      <div className={Styles.wrapper}>
        <div className={Styles.loginBtn} onClick={doTheLogIn}>
          <div className={Styles.logoFb}>

          </div>
          <p>
            Login with Facebook
          </p>
        </div>
      </div>
    );
  
}

export default connect(null, mapDispatchToProps)(Login);
