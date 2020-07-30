import React from "react";
import Styles from './Login.module.css';
import { connect } from "react-redux";
import { login } from "../../redux/actions";

function Login() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = async () => {

  // }

    return (
      <div className={Styles.wrapper}>
        <div className={Styles.loginBtn}>
          <div className={Styles.logoFb}>

          </div>
          <p>
            Login with Facebook
          </p>
        </div>
      </div>
    );
  
}

export default connect(null, {login})(Login);
