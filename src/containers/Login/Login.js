import React, { useEffect } from "react";
import Styles from './Login.module.css';
import { connect } from "react-redux";
import { login, initFriendList } from "../../redux/actions";
import firebase from "../../utils/firebase";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import host from '../../utils';
import { addScript } from './addScript';

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (name, avatar, token) => {
      dispatch(login({name, avatar, token}));
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

const getName = () => new Promise(resolve => {
  FB.api('/me', response => {
    resolve(response.name);
  })
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

function Login(props) {
  const history = useHistory();
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('use_friends');
  console.log("provider: ", provider);

  const getInfo = async () => {
    let authResponse, type, name, userId, token, avatar;


    // await FB.getLoginStatus(response => {
    //   if(response.status === 'connected') {
    //     console.log('get login status ')
    //     type = 'get login status';
    //     realResponse = response;
    //     return;
    //   } else { 
    //     console.log('login begin');
    //     (async () => {
    //     await FB.login(response => {
    //       type = 'login';
    //       realResponse = response
    //       return;
    //     }, {scope: 'email, public_profile'})
    //   })();
    //   }
    // });

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

    token = authResponse.accessToken;
    userId = authResponse.userID;

    avatar = await getAvatar(userId);
    name = await getName();

    const friendList = await getFriendList(userId);

    const avatars = await Promise.all(
      friendList.map(f => getAvatar(f.id))
    );
    const friendListAfterAddAvatar = friendList.map((f, index) => ({
      ...f,
      avatar: avatars[index],
    }));

    props.onLogIn(name, avatar, token);
    props.onInitFriendList(friendListAfterAddAvatar);
    history.push('/')
  }

  const doTheLogIn = () => {
    getInfo();

    // FB.getLoginStatus(response => {
    //   if()
    // })

    // window.FB.login(response => {
    //   console.log("response: ", response);
    //   //const token = response.
    //   if(response.status !== 'connected') {
    //     alert('Login failed');
    //     return;
    //   }

    //   const authResponse = response.authResponse;
    //   const token = authResponse.accessToken;
    //   const userId = authResponse.userID;

    //   const url = 'https://graph.facebook.com/v7.0/' + userId + '/friends?access_token=' + token;
     
    //   window.FB.api('/me', user => {
    //     console.log("user: ", user);
    //   props.onLogIn(user.name, 'https://i.imgur.com/ZA4J2Bw.jpeg', token);
    //   axios.get(url).then(response => {
    //     console.log("response.data: ", response.data);
    //     history.push('/');  
    //   }).catch(error => {
    //     console.log('error message: ', error.message);
    //   })
    // })
    // }, {scope: 'email, public_profile'})
    
  }

  // useEffect(() => {
  //   try {
  //     addScript();
  //     const params = {
  //       appId: `613991812636061`,
  //       cookie: true,
  //       xfbml: false,
  //       version: 'v7.0'
  //     };
  //     window.FB.init(params);
  //   } catch(error) {
  //       console.log("error: ", error);
  //   }
  
  // } )

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
