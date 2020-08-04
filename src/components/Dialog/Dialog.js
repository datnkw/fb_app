import React, { useState } from 'react';
import Styles from './Dialog.module.css';

function Dialog(props) {
  const { children } = props;

  return (
    <div className={Styles.wrapper}>
      <div className={Styles.contentWrapper}>
        {children}
      </div>
    </div>
  )
}