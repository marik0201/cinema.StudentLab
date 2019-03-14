import React from "react";
import CinemasPage from "../CinemasPage/CinemasPage";
import UserPage from "../UserPage/UserPage";
import EditCinema from "../EditCinema/EditCinema";
import EditFilm from "../EditFilm/EditFilm";
import EditSession from "../EditSession/EditSession";
import EditUsers from "../EditUsers/EditUsers";
import AdminPage from "../AdminPage/AdminPage";
import { Switch, Route } from "react-router-dom";

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
    </Switch>
  </main>
);

export default Main;
