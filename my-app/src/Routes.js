import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Container} from 'react-bootstrap';

import User from './User';
// import Example from './Example';
// import Test from './Test';
import Complete from './Complete';

class Routes extends React.Component {
  render() {
    return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" exact component={User} />
	      {/* <Route exact path="/example" component={Example} />
          <Route exact path="/test" component={Test} /> */}
          <Route exact path="/completion" component={Complete} />
        </Switch>
      </Router>
    </Container>
    )
  }
}

export default Routes;