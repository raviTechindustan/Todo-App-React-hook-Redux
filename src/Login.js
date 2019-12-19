import React from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link} from "react-router-dom";


function Login() {

  return (
    <Container fluid>
      <Row>
        <Col xs={12} sm={6} md={8} lg={8}>

        </Col>
        <Col xs={12} sm={6} md={4} lg={4}>
          <div className='login-container'>
            <div className="h-v-center">
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit" className="Login">
                  Submit
                </Button>
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