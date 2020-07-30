import React, {useEffect} from 'react';
import { TopBar } from '../../components';
import ItemUser from './ItemUser';
import { connect } from 'react-redux';
import { getFriendList, getFriendById } from '../../redux/selectors';
import { initFriendList, toggleFriendQuality } from '../../redux/actions';

const mapStateToProps = state => {
  const friendIdList = getFriendList(state);
  const friendList = [];

  friendIdList.forEach(id => {
    friendList.push({
      id,
      ...getFriendById(state, id)
    })
  });



  return { friendList };
}

const mapDispatchToProps = dispatch => {
  return {
    onInitFriendList: friendList => {
      dispatch(initFriendList(friendList))
    },
    onClickCheckbox: id => {
      dispatch(toggleFriendQuality(id))
    }
  }
}

function Dashboard(props) {
  const {friendList, onInitFriendList, onClickCheckbox} = props;

  

  return (
    <div>
      <TopBar />
      <div className='content'>
      {
        friendList.map((item) => <ItemUser key={item.id} info={item} onClickCheckbox={()=>onClickCheckbox(item.id)}/>)
      }
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);