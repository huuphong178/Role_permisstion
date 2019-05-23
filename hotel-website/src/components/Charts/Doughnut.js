import React, { Component } from 'react';
import { Doughnut} from 'react-chartjs-2';
import { Card, CardBody, CardHeader,Col,  Button,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Row} from 'reactstrap';
import {getRoomTypeChart} from '../../api/room'

class Charts extends Component {
  constructor(props){
    super(props)
    this.state={
        submit: false,
        chartRoomType:[],
        txtmonth:'',
        txtyear:''
    }
  }
    onChange= (e) =>{
      var target=e.target;
      var name=target.name;
      var value=target.value;
      this.setState({
          [name]: value
      });
    }
    onSave=(e)=>{
        e.preventDefault();
        let month= this.state.txtmonth;
        let year= this.state.txtyear;
        getRoomTypeChart(month, year).then(res=>{
          this.setState({
            chartRoomType: res.data,
            submit: true
          })
        })
      
      }
      backChoose=(e)=>{
        this.setState({submit: false})
      }
  render() {
   
    var {submit,txtmonth, txtyear,chartRoomType}=this.state;
    const doughnut = {
      labels: ["Single", "Double", "Three", "Tập thể"],
      datasets: [
        {
          data: chartRoomType,
          backgroundColor: [
            "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"
          ],
          hoverBackgroundColor: [
            "#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9"
          ],
        }],
    };
    if(!submit) return (
      <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                <Card>
               
                <CardHeader>
                    <strong>Form chart</strong>
                </CardHeader>
                <CardBody>
                <Form className="form-horizontal" onSubmit={this.onSave}>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="text-input">Month</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="number" id="text-input" 
                        name="txtmonth"
                        value={txtmonth}
                        onChange={this.onChange}
                         placeholder="month" />
                        </Col>
                    </FormGroup>
                    </Col>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="text-input">Year</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="number" id="text-input" 
                        name="txtyear"
                        value={txtyear}
                        onChange={this.onChange}
                         placeholder="year" />
                        </Col>
                    </FormGroup>
                    </Col>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </Form>
                </CardBody>
                <CardFooter>
                   
                </CardFooter>
                </Card>
            </Col>
                </Row>
            </div>
    )
    return (
      <div className="animated fadeIn">
       <Button color="success" onClick={this.backChoose}>Back
          </Button>
      <Col xs="12" lg="12">
     
          <Card>
            <CardHeader>
            Show chart loại phòng được đặt trong tháng
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Doughnut data={doughnut} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Charts;
