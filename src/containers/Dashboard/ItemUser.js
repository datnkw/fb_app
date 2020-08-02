import React from "react";
import Styles from "./Dashboard.module.css";
import { useHistory } from "react-router-dom";

function ItemUser({ info, onClickCheckbox }) {
  const history = useHistory();

  const goToInfoPage = (id) => {
    history.push({
      pathname: "/info/" + id
    });
  }

  const onClickCheckboxInside = (event) => {
    event.stopPropagation();
    onClickCheckbox();
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
            <input className={Styles.checkbox} type="checkbox" onClick={onClickCheckboxInside}  defaultChecked={!info.isGoodFriend}/>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default ItemUser;