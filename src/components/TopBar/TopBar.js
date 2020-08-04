import React, { useEffect } from 'react';
import Styles from './TopBar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getAuthInfo } from '../../redux/selectors';
import { logout } from '../../redux/actions';
import { useHistory } from 'react-router-dom';

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
    }
  }
}

function TopBar(props) {
  const { info, onLogOut } = props;

  const history = useHistory();

  useEffect(() => {
    if(!info.isLogin) {
      history.push('/login')
    }
  }, [info.isLogin]);

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.infoWrapper}>
        <div className={Styles.avatarWrapper}>
          <img src={info.avatar} alt='' />
        </div>
        <p>{info.name}</p>
      </div>

      <div className={Styles.logoutBtn} onClick={onLogOut}><FaSignOutAlt /></div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);