import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import { About } from './About';
import { Layout } from './components/Layout';
import { Jumbotron } from './components/Jumbotron';

function App() {
  return (
    <React.Fragment> 
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
