import React from "react";
import { Switch, Route } from "react-router-dom";
import CinemasPage from "../CinemasPage/CinemasPage";
import UserPage from "../UserPage/UserPage";
import EditCinema from "../EditCinema/EditCinema";
import EditFilm from "../EditFilm/EditFilm";
import EditSession from "../EditSession/EditSession";
import EditUsers from "../EditUsers/EditUsers";
import AdminPage from "../AdminPage/AdminPage";
import Auth from "../Auth/Auth"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={CinemasPage} />
      <Route exact path="/user" component={UserPage} />
      <Route exact path="/admin/cinema" component={EditCinema} />
      <Route exact path="/admin/films" component={EditFilm} />
      <Route exact path="/admin/session" component={EditSession} />
      <Route exact path="/admin/users" component={EditUsers} />
      <Route exact path="/admin" component={AdminPage} />
      <Route exact path="/auth" component={Auth} />
    </Switch>
  </main>
);

export default Main;
