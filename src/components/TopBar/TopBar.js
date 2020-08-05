import React, { useState, useEffect } from 'react';
import Styles from './TopBar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getAuthInfo } from '../../redux/selectors';
import { login, logout, initFriendList } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { Loading } from '../';

const mapStateToProps = state => {
  return { info: getAuthInfo(state) }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogOut: async () => {
      await window.FB.logout(response => {
        console.log("response logout: ", response);
      });
      dispatch(logout());
    },
    onLogIn: (info) => {
      dispatch(login(info));
    },
    onInitFriendList: (friendList) => {
      dispatch(initFriendList(...[friendList]));
    }
  }
}

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

function TopBar(props) {
  const { info, onLogOut } = props;

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  const goHome = () => {
    history.push('/');
  }

  const getInfo = async () => {

  }

  useEffect(() => {
    if(info.isLogin) {
      setIsLoading(false); 
      return;
    }

    FB.getLoginStatus(async (response) => {
      if(response.status !== 'connected') {
        setIsLoading(false);
        console.log('response status: ', response.status);
        history.push('/login')
        return;
      }

      console.log('already login');

      const authResponse = response.authResponse;
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

      setIsLoading(false);
    }, true);

  }, [info.isLogin]);

  if(isLoading) {
    return <Loading />
  }

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.btnHome} onClick={goHome}></div>
      <div className={Styles.infoWrapper}>
        <div className={Styles.avatarWrapper}>
          <img src={info.avatar} alt='' />
        </div>
        <div className={Styles.nameAndEmail}>
        <p className={Styles.name}>{info.name}</p>
  <p className={Styles.email}>{info.email}</p>
  </div>
      </div>

      <div className={Styles.logoutBtn} onClick={onLogOut}><FaSignOutAlt /></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);