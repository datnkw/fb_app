import React, {useEffect} from "react";
import "./styles/App.css";

import RouterComponent from "./components/Router/Router";

import { connect } from 'react-redux';
import { initFriendList } from './redux/actions';



import friendList from './utils/friendList';

const mapDispatchToProps = dispatch => {
  return {
    onInitFriendList: friendList => {
      dispatch(initFriendList(friendList))
    }
  }
}

function App(props) {
  const {onInitFriendList} = props

  useEffect(() => {
    console.log('efdfdfdf')
    onInitFriendList(friendList);
  }, [])

  return (
    <RouterComponent />
  );
}

export default connect(null, mapDispatchToProps)(App);
