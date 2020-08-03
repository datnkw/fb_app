import React from "react";
import Styles from './Login.module.css';
import { connect } from "react-redux";
import { login } from "../../redux/actions";
import firebase from "../../utils/firebase";
import { useHistory } from 'react-router-dom';
import axios from "axios";

const mapDispatchToProps = dispatch => {
  return {
    onLogIn: (name, avatar, token) => {
      console.log("name in onLogIn: ", name);
      dispatch(login({name, avatar, token}));
    }
  }
}

const tokenTest = 'EAAIubBvjHZA0BAKlnBZBYciQ7A1yNUJURnSEnJfws2an0Q4KflENqeJTP2T3PvJdaH5NtXZCdLSL0ZCgm4BmlzI95wlafrU01NhPdMGAETfq3loZAIjHQ7rGMNxMiTMKZCl9Q0omsDnmsGBWM2H77kMc7cCuKMOJnCt5ZA4yl6DUkjb03O3xyGHHuMElBxg6sf3NN6mQk2wFFOiZAVbYtJ10'

function Login(props) {
  const history = useHistory();
  const provider = new firebase.auth.FacebookAuthProvider();
  // provider.addScope('use_friends');
  console.log("provider: ", provider);

  const doTheLogIn = () => {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...

      console.log("token: ", token);
      console.log("user: ", user);

      console.log("name: ", user.displayName);

      props.onLogIn(user.displayName, user.photoURL, token);
      const url = 'https://graph.facebook.com/v7.0/649576518990903/friends?access_token=' + tokenTest;
      axios.get(url).then(response => {
        console.log("response.data: ", response.data);
        history.push('/');  
      }).catch(error => {
        console.log('error message: ', error.message);
      })
      
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...

      console.log("errorCode: ", errorCode);
      console.log("errorMessage: ", errorMessage);
      
    });
    
  }

    return (
      <div className={Styles.wrapper}>
        <div className={Styles.loginBtn} onClick={doTheLogIn}>
          <div className={Styles.logoFb}>

          </div>
          <p>
            Login with Facebook
          </p>
        </div>
      </div>
    );
  
}

export default connect(null, mapDispatchToProps)(Login);
