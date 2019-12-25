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
          <Route exact path="/" component={NewTodo} />
          {/* <Route exact path="/" component={Todo} /> */}
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
        </Switch>
      </Router>
     
    </div>
  )
}
export default Routers ;