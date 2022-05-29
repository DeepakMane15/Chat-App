import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import {PrivateRoute, useAuth} from './components/privateRoutes';

const App = () => {
  return (
    <Router>
      <PrivateRoute>
        <Switch>
          <Route path="/signup" exact component={Register} />
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
        </Switch>
        </PrivateRoute>
      </Router> 
  )
}

export default App;
