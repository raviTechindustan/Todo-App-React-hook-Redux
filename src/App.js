import React from 'react';
import { Row, Col } from 'react-bootstrap'
function App() {
  return (
    <div className="top-class">
      <Row>

        <Col md={6}>
          sdfaf
          </Col>
        <Col md={6}>
          <div className="second-div">
            <div className="welcome">
              welcome!
            </div>
            <div className="text-center"> 
              <div className="input-group-prepend ">
                <span className="input-group-text" > <i class="fa fa-user icon"></i></span>
                <input type="text" className="form-control" placeholder="Username" />
              </div>
              <div className="input-group-prepend ">
                <span className="input-group-text" > <i class="fas fa-lock"></i></span>
                <input type="text" className="form-control" placeholder="Password" />
              </div>
              <div className="forgot-password">
                <input type="radio" /><span className="remember">Remember my password </span> 
                <span className="forgot">Forgot your password ?</span>
             
              </div>
            </div>
          </div>
        </Col>

      </Row>
    </div>
  );
}

export default App;
