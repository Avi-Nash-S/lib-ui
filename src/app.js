import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LandingPageViews from './views/landingPage-views';
import LoginPage from './views/loginPage-views';
// import CardDetailsViews from './views/cardDetails-views'

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={LandingPageViews} />
      <Route exact path={`/login`} component={LoginPage} />
      {/* <Route path={`/:id`} component={CardDetailsViews} /> */}
    </Switch>
  );
};

export default withRouter(App);
