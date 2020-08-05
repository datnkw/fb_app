import React, { useReducer, useEffect } from 'react';
import Styles from './PersonalInfo.module.css';
import { connect } from 'react-redux';
import { getFriendById } from '../../redux/selectors';
import { editInfo } from '../../redux/actions';
import { TopBar } from '../../components';
import classNames from 'classnames';

const mapStateToProps = (state) => {
  const pathname = window.location.pathname;
  const id = pathname.substr(pathname.lastIndexOf('/') + 1);
  const info = getFriendById(state, parseInt(id));

  return { id, info }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangeInfo: (id, info) => {
      dispatch(editInfo(id, info));
      alert('save successful!');
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "all":
      return {
        ...state,
        ...action.value
      }
    case "nickname":
      return {
        ...state,
        nickname: action.value,
      };
    case "description":
      return {
        ...state,
        description: action.value,
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
  const { id, info, onChangeInfo } = props;

  const [infoState, setInfoState] = useReducer(reducer, info);

  const handleChange = (event) => {
    const target = event.target;
    setInfoState({
      type: target.name,
      value: target.value,
    });
  };

  const getDetail = (info, type) => {
    //remember Mr.Tam has said "don't make your code be complicated"

    return info ? info[type] : (() => {
      if (type === 'avatar') {
        return '../../images/avatar.jpg';
      } else {
        return '';
      }
    })()
  }

  useEffect(() => {
    setInfoState({
      type: 'all',
      value: { ...info }
    })
  }, [JSON.stringify(info)])

  const getFinalDetail = (infoState, type) => {
    const result = getDetail(infoState, type);
    return result ? result : '';
  }

  const toggleQuality = () => {
    setInfoState({
      type: 'isGoodFriend',
      value: !infoState.isGoodFriend
    })
  }

  const submitInfo = () =>{
    onChangeInfo(id, infoState);
  }

  return (
    <div className={Styles.wrapper}>
      <TopBar />
      <div className={classNames('content')}>
        <div className={Styles.wrapperContent}>
          
          <div className={Styles.avatarAndNickname} >
            <div className={Styles.avatar}>
              <img src={getDetail(infoState, 'avatar')} alt="" />
            </div>
            <div className={Styles.inputAndToggleWrapper}>
            <div className={Styles.nicknameWrapper}>
              <p>Nickname</p>
              <input type="text" name='nickname' value={getFinalDetail(infoState, 'nickname')} onChange={handleChange} />

            </div>
            <div className={Styles.switchQuality} onClick={toggleQuality}>
              <div className={Styles.leftSide}>Bad friend </div>
              <div className={Styles.rightSide}>Good friend</div>
              <div className={classNames(
                Styles.coverPiece,
                getDetail(infoState, 'isGoodFriend') ? '' : Styles.toggle
              )}></div>
            </div>
          </div>
          </div>
          <div className={Styles.descriptionWrapper}>
            <p className={Styles.label}>Description</p>
            <textarea type="text" name='description' rows="5" value={getFinalDetail(infoState, 'description')} onChange={handleChange} />
          </div>
          <div className={Styles.submit}>
            <button onClick={submitInfo}>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)