import React, { useEffect, useState } from 'react';
import Styles from './TopBar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getAuthInfo } from '../../redux/selectors';
import { logout } from '../../redux/actions';
import { useHistory } from 'react-router-dom';
import { Dialog } from '../';

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

  const [ isVisibleDialog, setIsVisibleDialog ] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if(!info.isLogin) {
      history.push('/login')
    }
  }, [info.isLogin]);

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.infoWrapper} onClick={()=>setIsVisibleDialog(true)}>
        <div className={Styles.avatarWrapper}>
          <img src={info.avatar} alt='' />
        </div>
        <p>{info.name}</p>
      </div>

      <div className={Styles.logoutBtn} onClick={onLogOut}><FaSignOutAlt /></div>

      <Dialog isShowedUp={isVisibleDialog} toggleDialog={()=>setIsVisibleDialog(false)}>
        <div className={Styles.dialogWrapper}>
          <div className={Styles.avatarInDialog}>
            <img src={info.avatar} />
          </div>
          <div className={Styles.contentInDialog}>
  <p className={Styles.nameInDialog}>{info.name}</p>
  <p className={Styles.emailInDialog}>{info.email}</p>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);