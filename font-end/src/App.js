import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { subDomain, redirectTo } from './services/redirect';
import Login from './pages/login';
// import Loginredirect from './pages/loginRedirect'
import Competition from './pages/manager/competition';
import './App.css';

const signedIn = localStorage.getItem("access-token") && localStorage.getItem("refresh-token");
const Privateroute = ({ issignedIn, ...props }) => {
  return issignedIn ? <Route {...props} /> : redirectTo(`/login`);
};
const Mainroute = () => {
  return <Redirect to={`${subDomain}/competition`} />;
};

function App() {
  if (window.location.pathname === `${subDomain}/login` || window.location.pathname.search('loginredirect') !== -1) {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={`${subDomain}/login`} component={Login} />
            {/* <Route exact path={`${subDomain}/loginredirect`} component={Loginredirect} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
  else {
    return (
      <BrowserRouter>
        <div className="App">
              <Switch>
                <Mainroute issignedIn={signedIn} exact path={`${subDomain}/`} />
                <Mainroute issignedIn={signedIn} exact path={`/`} />
                <Privateroute
                  issignedIn={signedIn}
                  exact
                  path={`${subDomain}/competition`}
                  component={Competition}
                />
              </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
