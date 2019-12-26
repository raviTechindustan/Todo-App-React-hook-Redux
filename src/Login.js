import React, { useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link} from "react-router-dom";




function Login() {
  
  const [user,setuser] = useState({email:'',password:''})
  function onSetUser(e) {
    const {name , value} = e.target
    setuser({
      ...user,
      [name]:value
    })
  }

  function onsubmit(e) {
    e.preventDefault();
    if((user.email === 'test@test.com')  && (user.password === 'test'))
    {
      props.history.push("/NewTodo");
    } 
  }
  console.log(user,"user")

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
                <Button variant="primary" type="submit" className="Login" >
                  Submit
                </Button>{'  '}
                <Link to='/Signup'>Signup</Link>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;