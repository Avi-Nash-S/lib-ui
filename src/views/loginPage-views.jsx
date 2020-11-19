import React, { Component } from 'react';
import SignIn from '../components/loginPage';
import SignUp from '../components/signupPage';
import { LoginContainer } from '../view-styles/loginPage-styles';
import { connect } from 'react-redux';
import { login, signup } from '../redux/user/user.action';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const pageMode = {
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
};
class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState: 'LOGIN',
      userName: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      message: '',
      messageOpen: false,
    };
  }
  componentDidUpdate(prevProps) {
    const { loginError, user } = this.props.data;
    if (prevProps.data.loginError !== loginError && loginError) {
      this.setState({
        messageOpen: true,
        message: 'Invalid Credentials, Please provide valid username and password!',
      });
      setTimeout(() => {
        this.handleSnackbarClose();
      }, 6000);
    }
    if (prevProps.data.user !== user && user) {
      this.props.history.push('/');
    }
    // if()
  }
  onLoginClick = () => {
    this.setState({
      pageState: pageMode.LOGIN,
      userName: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    });
  };
  onRegisterClick = () => {
    this.setState({
      pageState: pageMode.REGISTER,
      userName: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
    });
  };
  onSignIn = () => {
    const { userName, password } = this.state;
    this.props.onLogin(userName, password);
  };
  onSignUp = () => {
    const { firstName, lastName, email, userName, password } = this.state;
    let tempsignUpdetails = {
      firstName: firstName,
      lastName: lastName,
      userEmail: email,
      userName: userName,
      password: password,
    };
    this.props.onSignUp(tempsignUpdetails);
  };
  onInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSnackbarClose = () => {
    this.setState({
      messageOpen: false,
    });
  };
  render() {
    const { pageState, firstName, lastName, email, userName, password, messageOpen, message } = this.state;
    const { loading } = this.props.data;
    return (
      <LoginContainer>
        {pageState === pageMode.LOGIN ? (
          <SignIn
            userName={userName}
            password={password}
            onSignUpClick={this.onRegisterClick}
            onSignIn={this.onSignIn}
            onInputChange={this.onInputChange}
            loading={loading}
          />
        ) : (
          <SignUp
            firstName={firstName}
            lastname={lastName}
            email={email}
            userName={userName}
            password={password}
            onSignInClick={this.onLoginClick}
            onSignUpClick={this.onRegisterClick}
            onSignup={this.onSignUp}
            onInputChange={this.onInputChange}
          />
        )}
        <div>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={messageOpen}
            // autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
            onBlur={this.handleSnackbarClose}
            message={message}
            action={
              <React.Fragment>
                <IconButton size='small' aria-label='close' color='inherit' onClick={this.handleSnackbarClose}>
                  <CloseIcon fontSize='small' />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      </LoginContainer>
    );
  }
}

const mapStateToProps = (storeState) => ({
  data: storeState.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (userName, Password) => dispatch(login(userName, Password)),
  onSignUp: (loginDetails) => dispatch(signup(loginDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
