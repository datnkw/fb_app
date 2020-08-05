import React from 'react';
import { TopBar, Loading } from '../../components';
import ItemUser from './ItemUser';
import { connect } from 'react-redux';
import { getFriendList, getFriendById } from '../../redux/selectors';
import { toggleFriendQuality } from '../../redux/actions';

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
    onClickCheckbox: (id) => {
      dispatch(toggleFriendQuality(id));
    }
  }
}

function Dashboard(props) {
  const {friendList, onClickCheckbox} = props;

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