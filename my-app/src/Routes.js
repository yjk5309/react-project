import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import User from './User';
import Exam from './Exam';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={User} />
	      <Route exact path="/exam" component={Exam} />
          
        </Switch>
      </Router>
    )
  }
}

export default Routes;