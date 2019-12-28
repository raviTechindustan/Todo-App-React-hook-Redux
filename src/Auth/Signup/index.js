import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { validator } from '../../utilities/validations/validation'
import { useHistory } from 'react-router'
import { signup } from '../actions';
import { toast } from 'react-toastify';

function Signup() {

  const [users, setUsers] = useState({ email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState({})
  const dispatch = useDispatch();
  const history = useHistory();
  function onhandleChange(e) {
    const { name, value } = e.target
    setUsers({
      ...users,
      [name]: value
    })
  }

  function onSubmit(e) {
    e.preventDefault();
    if (isValid(users)) {
      dispatch(signup(users));
      toast.success("User has been registered successfully!");
      setTimeout(() => {
        history.push('/')
      }, 5000);
    }
  }

  function isValid(data) {
    let { errors, isValid } = validator(data)
    setError(errors)
    return isValid
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={8} lg={8}>

          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <div className='login-container'>
              <div className="h-v-center">
                <Form onSubmit={(e) => onSubmit(e)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={(e) => onhandleChange(e)} />
                  </Form.Group><p style={{ color: "red" }}>{error.email}</p>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onhandleChange(e)} />
                  </Form.Group><p style={{ color: "red" }}>{error.password}</p>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="confirmPassword" onChange={(e) => onhandleChange(e)} />
                  </Form.Group><p style={{ color: "red" }}>{error.confirmPassword}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" type="submit" className="mr-3">Submit</Button>
                    <Link to='/'>Alreay have an account?</Link>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Signup;