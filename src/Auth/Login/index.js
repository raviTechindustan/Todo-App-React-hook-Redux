import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router';
import {  useSelector,useDispatch } from 'react-redux'
import { login, initialize } from '../actions';
import { toast } from 'react-toastify';

function Login() {
  
  const [user,setuser] = useState({email:'',password:''});
  const history = useHistory();
  const dispatch =  useDispatch();
  const registeredUsers = useSelector(state => state.auth.registeredUsers);

  useEffect(() => {
    dispatch(initialize());
  }, [])

  function onSetUser(e) {
    const {name , value} = e.target
    setuser({
      ...user,
      [name]:value
    })
  }

  function onsubmit(e) {
    e.preventDefault();
    let currentUser = registeredUsers && registeredUsers.length ? registeredUsers.find(item => item.email === user.email && item.password === user.password) : {};
    if (currentUser && currentUser.email) {
      dispatch(login(currentUser))
      toast.success("Logged in successfully!");
      history.push("/NewTodo");
    } else {
      toast.error("Unable to find registered email");
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} md={8} lg={8}>
        </Col>
        <Col xs={12} sm={6} md={4} lg={4}>
          <div className='login-container'>
            <div className="h-v-center">
              <Form onSubmit={onsubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => onSetUser(e)} />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onSetUser(e)} />
                </Form.Group>
                <div className="d-flex justify-content-between align-items-center">
                  <Button variant="primary" type="submit" className="Login mr-3">
                    Submit
                  </Button>
                  <Link to='/Signup'>New Member?</Link>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;