import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DefaultNavbar from './components/layout/default-navbar';
import DefaultContainer from './components/layout/default-container';
import Task from "./pages/Task";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <DefaultNavbar />
        <DefaultContainer>
          <Switch>
            <Route path="/" exact component={Task} />
          </Switch>
        </DefaultContainer>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
