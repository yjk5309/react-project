import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import {Container, Button} from 'react-bootstrap';
import './Test.css';

import User from './User';
import Complete from './Complete';
import Result from './Result';
import {UrlContext} from './Context'

function Routes() {
    const [url, setUrl] = useState('');
    const urlValue = {url, setUrl};
    const [day, setDay] = useState(true);

    let body = document.querySelector("body");
    body.classList.add("container_day")

    function handleMode(e){
      {day===false ? setDay(true) : setDay(false)}
      if(day === false){
        body.classList.remove("container_night")
        body.classList.add("container_day")
      }else{
        body.classList.remove("container_day")
        body.classList.add("container_night")
      }
    }

    return (
      <Container>
      <div className="left">
      <Button variant="outline-warning" onClick={handleMode}>
        {day === false ? "night mode":"day mode"}</Button>
      </div>
      <Router>
        <Switch>
          <Route exact path="/">
            <UrlContext.Provider value={urlValue}>
              <User/>
            </UrlContext.Provider>
          </Route>
          <Route exact path="/completion/:seq">
            <Complete />
          </Route>
          <Route exact path="/result/:seq">
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