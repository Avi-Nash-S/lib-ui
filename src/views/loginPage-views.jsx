import React, { Component } from "react";
import SignIn from "../components/signIn-component";
import SignUp from "../components/signUp-component";

import { LoginContainer } from "../view-styles/loginPage-styles";

const pageMode = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: "LOGIN",
    };
  }
  onLoginClick = () => {
    this.setState({
      pageState: pageMode.LOGIN,
    });
  };
  onRegisterClick = () => {
    this.setState({
      pageState: pageMode.REGISTER,
    });
  };
  render() {
    const { pageState } = this.state;
    return (
      <LoginContainer>
        {pageState === pageMode.LOGIN ? (
          <SignIn onSignUpClick={this.onRegisterClick} />
        ) : (
          <SignUp onSignInClick={this.onLoginClick} />
        )}
      </LoginContainer>
    );
  }
}

export default LoginPage;
