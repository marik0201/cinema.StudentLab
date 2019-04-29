import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CinemasPage from '../CinemasPage/CinemasPage';
import UserPage from '../UserPage/UserPage';
import AdminPage from '../AdminPage/AdminPage';
import Session from '../Session/Session';
import Auth from '../Auth/Auth';


const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={CinemasPage} />
      <Route path="/film/:film" component={Session} />
      <Route exact path="/user" component={UserPage} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/auth" component={Auth} />
    </Switch>
  </main>
);

export default Main;
