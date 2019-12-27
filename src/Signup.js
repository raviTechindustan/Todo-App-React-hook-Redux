import React,{useState , useEffect}from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { userRegister  } from './redux/actions'

function Signup () {
  const [users,setUsers] = useState({email:'',password:'', confirmPassword:''})
  const dispatch = useDispatch();
  function onhandleChange (e) {
    const {name,value} = e.target
    setUsers({
      ...users,
      [name]: value
    })
  }

  function onSubmit (e) {
    e.preventDefault();
    console.log("inside onSubmit function")
    dispatch(userRegister(users));
  }
  
  return(
    <div>
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={8} lg={8}>

          </Col>
          <Col xs={12} sm={6} md={4} lg={4}>
            <div className='login-container'>
              <div className="h-v-center">
                <Form onSubmit ={(e) => onSubmit(e)}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"  onChange={(e) => onhandleChange(e)} />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={(e) => onhandleChange(e)}/>
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="confirmPassword" onChange={(e) => onhandleChange(e)}/>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="Login">
                    Submit
                </Button>{`   `}
                  <Link to='/'>Back</Link>
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