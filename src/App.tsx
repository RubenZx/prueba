import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import Home from "./screens/Home";
import UserInfo from "./screens/UserInfo";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const App = () => {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <StyledLink to="/users">Usuarios</StyledLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/users" component={Home} />
        <Route exact path="/users/:id" component={UserInfo} />
        <Route path="*">
          <Redirect to="/users" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
