import React from "react";
import Styles from "./Dashboard.module.css";
// import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";
// import { connect } from 'react-redux';
// import { getFriendById } from '../../redux/selectors';
// import { toggleFriendQuality } from '../../redux/actions';

// const mapStateToProps = (state, ownProps) => {
//   const {id} = ownProps;

//   return { info: getFriendById(state, id)}
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onClickCheckbox: id => {
//       dispatch(toggleFriendQuality(id))
//     }
//   }
// }

function ItemUser({ info, onClickCheckbox }) {
  console.log("info: ", info.id);

  const infoPageLink = info.id;

  const history = useHistory();

  const goToInfoPage = (id) => {
    history.push({
      pathname: "/info/" + id
    });
  }

  return (
    // <Link to={infoPageLink}>
    <div className={Styles.ItemUserWrapper} onClick={()=>goToInfoPage(info.id)}>
      <div className={Styles.avatar}>
        <img src={info.avatar} alt=""/>
      </div>
      <div className={Styles.info}>
        <p className={Styles.name}>{info.name}</p>
        <div className={Styles.space} />
        <div className={Styles.markWrapper}>
          <p>Bad friend</p>
          <div>
            <input className={Styles.checkbox} type="checkbox" onClick={onClickCheckbox}  checked={!info.isGoodFriend}/>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default ItemUser;