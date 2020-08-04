import React, { useState } from 'react';
import classNames from 'classnames';
import Styles from './Dialog.module.css';

function Dialog(props) {
  const { children, isShowedUp, toggleDialog } = props;

  return (
    <div className={
      classNames(
        Styles.wrapper,
        !isShowedUp ? Styles.hidden : ''
        )}
      onClick={toggleDialog}>
      <div className={Styles.contentWrapper}>
        {children}
      </div>
    </div>
  )
}

export default Dialog;