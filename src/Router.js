import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Todo from './Todo';
import { loadInitials, loadInitialsForAuth } from './redux/actions/index';
import { useDispatch } from 'react-redux';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

function Routers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitials())
    dispatch(loadInitialsForAuth())
  }, [])
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/NewTodo" component={Todo} />
        </Switch>
      </Router>
     
    </div>
  )
}
export default Routers ;