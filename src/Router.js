import React from 'react'
import Login from './Login'
import Signup from './Signup'
import Todo from './Todo'
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import NewTodo from './NewTodo';

function Routers() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Todo} />
          <Route path="/Signup" component={Signup} />
          <Route path="/Login" component={Login} />
          <Route exact path="/sandeeps" component={NewTodo} />
        </Switch>
      </Router>
     
    </div>
  )
}
export default Routers ;