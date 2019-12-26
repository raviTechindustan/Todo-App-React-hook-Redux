import React, { useEffect } from 'react'
import Login from './Login'
import Signup from './Signup'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import NewTodo from './NewTodo';
import { loadInitials } from './redux/actions/index';
import { useDispatch } from 'react-redux';

function Routers() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadInitials())
  }, [])
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          {/* <Route exact path="/" component={Todo} /> */}
          <Route exact path="/Signup" component={Signup} />
          <Route exact path="/NewTodo" component={NewTodo} />
        </Switch>
      </Router>
     
    </div>
  )
}
export default Routers ;