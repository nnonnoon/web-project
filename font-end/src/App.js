import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { subDomain, redirectTo } from './services/redirect';
import Login from './pages/login';
import Competition from './pages/manager/competition';
import User from './pages/manager/user'
import './App.css';

const signedIn = localStorage.getItem("access-token") && localStorage.getItem("refresh-token");
const Privateroute = ({ issignedIn, ...props }) => {
  return issignedIn ? <Route {...props} /> : redirectTo(`/login`);
};

const Mainroute = () => {
  return  <Redirect to={`${subDomain}/competition`}/>;
};

function App() {
  if (window.location.pathname === `${subDomain}/login`) {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path={`${subDomain}/login`} component={Login} />
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
                <Mainroute signedIn={signedIn} exact path={`/`} />
                <Privateroute
                  issignedIn={signedIn}
                  exact path={`${subDomain}/competition`}
                  component={Competition}
                />
                <Privateroute
                  issignedIn={signedIn}
                  exact path={`${subDomain}/competition/index=:competition_index`}
                  component={User}
                />
              </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
