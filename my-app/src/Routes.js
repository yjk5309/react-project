import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import User from './User';
import Exam from './Exam';
import Test from './Test';

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" exact component={User} />
	      <Route exact path="/exam" component={Exam} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </Router>
    )
  }
}

export default Routes;