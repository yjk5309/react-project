import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Container} from 'react-bootstrap';

import User from './User';
import Complete from './Complete';
import {UrlContext} from './Context'

function Routes() {
    const [url, setUrl] = useState('');
    const urlValue = {url, setUrl};

    return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/" exact component={User} />
          <Route exact path="/completion">
            <UrlContext.Provider value={urlValue}>
              <Complete />
            </UrlContext.Provider>
          </Route>
        </Switch>
      </Router>
    </Container>
    )
  }

export default Routes;