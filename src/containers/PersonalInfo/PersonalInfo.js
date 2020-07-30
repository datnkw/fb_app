import React, { useReducer } from 'react';
import Styles from './PersonalInfo.module.css';
import { connect } from 'react-redux';
import { getFriendList, getFriendById } from '../../redux/selectors';
import { editInfo } from '../../redux/actions';

const mapStateToProps = (state) => {
  const friendList = getFriendList(state);

  console.log("friend list: ", friendList);

  const pathname = window.location.pathname;

  const id = pathname.substr(pathname.lastIndexOf('/') + 1);

  console.log("info id: ", id);

  const info = getFriendById(state, parseInt(id));

  console.log("info: ", info);

  return { info }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeInfo: info => {
      dispatch(editInfo(info))
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "nickname":
      return {
        ...state,
        nickname: action.value,
      };
    case "description":
      return {
        ...state,
        lastName: action.value,
      };
    case "isGoodFriend":
      return {
        ...state,
        isGoodFriend: action.value,
      };
    default:
      return state;
  }
}

function PersonalInfo(props) {
  const { info } = props;

  const [infoState, setInfoState] = useReducer(reducer, info);

  const handleChange = (event) => {
    const target = event.target;
    setInfoState({
      type: target.name,
      value: target.value,
    });
  };

  return (
    <div className={Styles.wrapper}>
    <div className={Styles.avatarAndNickname} >
      <img src={infoState.avatar} alt=""/>
      <div className={Styles.nicknameWrapper}>
        <p>Nickname</p>
        <input type="text" name='nickname' value={infoState.nickname} onChange={handleChange}/>
      </div>
    </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)