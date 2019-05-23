import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Jumbotron, Row } from 'reactstrap';

class About extends Component{
    componentDidMount(){
        console.log(this.el)
    }   
    render(){
        return (
            <div className="animated fadeIn">
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i><strong>About</strong>
                    <div className="card-header-actions">
                      <a href="https://reactstrap.github.io/components/jumbotron/" rel="noreferrer noopener" target="_blank" className="card-header-action">
                        <small className="text-muted">docs</small>
                      </a>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <Jumbotron>
                      <h1 className="display-3">Hello, world!</h1>
                      <img src={process.env.PUBLIC_URL + '/img/react.png'} alt="phong"/>
                      <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra
                        attention to featured content or information.</p>
                      <hr className="my-2" />
                      <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                      <p className="lead">
                        <Button color="primary">Learn More</Button>
                      </p>
                      
                    </Jumbotron>
                  </CardBody>
                </Card>
              </Col>
              </Row>
                
            </div>
        )
    }
    
}
export default About