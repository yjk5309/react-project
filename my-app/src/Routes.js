import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Container} from 'react-bootstrap';

import User from './User';
import Complete from './Complete';
import Result from './Result';
import {UrlContext} from './Context'

function Routes() {
    const [url, setUrl] = useState('');
    const urlValue = {url, setUrl};

    return (
    <Container>
      <Router>
        <Switch>
          <Route exact path="/">
            <UrlContext.Provider value={urlValue}>
              <User/>
            </UrlContext.Provider>
          </Route>
          <Route exact path="/completion">
            <Complete />
          </Route>
          <Route exact path="/result">
            <UrlContext.Provider value={urlValue}>
              <Result />
            </UrlContext.Provider>
          </Route>
        </Switch>
      </Router>
    </Container>
    )
  }

export default Routes;