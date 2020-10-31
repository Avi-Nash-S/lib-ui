import React from 'react';
import './app.css';
// import SignIn from './Components/Authentication/LoginPage';
import SignUp from './Components/Authentication/SignupPage';

class App extends React.Component {
  onFormSubmit = (event) => {
    console.log('Event : ', event);
  };
  render() {
    return (
      <div className='App'>
        {/* <SignIn onFormSubmit={this.onFormSubmit} /> */}
        <SignUp />
      </div>
    );
  }
}

export default App;
