import React, { Component } from 'react';
import { Card, CardBody, CardHeader,Col,  Button,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label,
  Row} from 'reactstrap';

import {getDaily_booking, getMonthly_booking, getWeekly_booking} from '../../api/filter'
import { Bar} from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {BootstrapTable, TableHeaderColumn, ExportCSVButton} from 'react-bootstrap-table';
import swal from 'sweetalert';
class Charts extends Component {
  constructor(props){
    super(props)
    this.state={
        submit: false,
        chartFilter:[],
        txtviewby:'daily',
        txtfromdate:'',
        txttodate:'',
        txtsystem:'hotelapp',
        txttop:'20'
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
        let txtviewby= this.state.txtviewby
        let txtfromdate=this.state.txtfromdate
        let txttodate = this.state.txttodate
        let txtsystem = this.state.txtsystem
        let txttop = this.state.txttop
        if(txtfromdate === '' || txttodate=== ''){
          swal("Thông báo!", "Bạn phải chọn đầy đủ thông tin!", "error");
        }else{
          if(txtviewby==='daily' && txtsystem === 'hotelapp'){
            getDaily_booking(txtfromdate, txttodate, txttop).then(res=>{
              this.setState({chartFilter:res.data})
            })
          }
          else if(txtviewby==='monthly' && txtsystem === 'hotelapp'){
            getMonthly_booking(txtfromdate, txttodate, txttop).then(res=>{
              this.setState({chartFilter:res.data})
            })
          }
          else if(txtviewby==='weekly' && txtsystem === 'hotelapp'){
            getWeekly_booking(txtfromdate, txttodate, txttop).then(res=>{
              this.setState({chartFilter:res.data})
            })
          }else{
              swal("Cảnh báo!", "Không có dữ liệu!", "warning");
            
          }
          
        }
      
      }
      onClick=(e)=>{
        console.log('Phong');
      }
      handleExportCSVButtonClick = (onClick) => {
        // Custom your onClick event here,
        // it's not necessary to implement this function if you have no any process before onClick
        console.log('This is my custom function for ExportCSVButton click event');
        onClick();
      }
      createCustomExportCSVButton = (onClick) => {
        return (
          <ExportCSVButton
            btnText='Down CSV'
            onClick={ () => this.handleExportCSVButtonClick(onClick) }/>
        );
      }
  render() {
    var {txtviewby, txtfromdate, txttodate, txtsystem,txttop, chartFilter}=this.state;
    var timelable=chartFilter.map(item=>{
      let d=new Date(item['time']);
      item['time']= d.toLocaleDateString("en-US")
      return item['time'];
    })
    var amount=chartFilter.map(item=>{
      return item['Amount'];
    })
    var dynamicColors = function() {
      var r = Math.floor(Math.random() * 255);
      var g = Math.floor(Math.random() * 255);
      var b = Math.floor(Math.random() * 255);
      return "rgb(" + r + "," + g + "," + b + ")";
  }
    const bar = {
        labels: timelable,
        datasets: [
          {
            label: 'Doanh thu',
            backgroundColor: dynamicColors(),
              borderColor: dynamicColors(),
            borderWidth: 1,
            hoverBackgroundColor: dynamicColors(),
            hoverBorderColor: dynamicColors(),
            data: amount,
          },
        ],
      };
      const options = {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false
      }
    return (
      <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                <Card>
               
                <CardHeader>
                    <strong>Form chart</strong>
                </CardHeader>
                <CardBody>
                <Form className="form-horizontal">
                    <Col md="12" xs="12">
                        <FormGroup row>
                        <Col md="8">
                        <Label className="float-left" htmlFor="ccmonth">View by</Label>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="select" name="txtviewby" id="ccmonth" value={txtviewby} onChange={this.onChange}>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </Input>
                        </Col>
                        </FormGroup>
                    </Col>
                    <Col md="12" xs="12">
                        <FormGroup row>
                        <Col md="8">
                        <Label className="float-left" htmlFor="ccmonth">From date</Label>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="date" id="from-date" name="txtfromdate" value={txtfromdate} placeholder="date" onChange={this.onChange}/>
                        </Col>
                        </FormGroup>
                    </Col>
                    <Col md="12" xs="12">
                        <FormGroup row>
                        <Col md="8">
                        <Label className="float-left" htmlFor="ccmonth">To date</Label>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="date" id="to-date" name="txttodate" value={txttodate} placeholder="date" onChange={this.onChange}/>
                        </Col>
                        </FormGroup>
                    </Col>
                    <Col md="12" xs="12">
                        <FormGroup row>
                        <Col md="8">
                        <Label className="float-left" htmlFor="ccmonth">System</Label>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="select" name="txtsystem" value={txtsystem} onChange={this.onChange} id="ccmonth">
                            <option value="zalopayapp">ZaloPay app</option>
                            <option value="hotelapp">Hotel app</option>
                            <option value="booking">Booking</option>
                        </Input>
                        </Col>
                        </FormGroup>
                    </Col>
                    <Col md="12" xs="12">
                        <FormGroup row>
                        <Col md="8">
                        <Label className="float-left" htmlFor="ccmonth">Top</Label>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="select" name="txttop" value={txttop} id="ccmonth" onChange={this.onChange}>
                            <option value="20">Top 20</option>
                            <option value="50">Top 50</option>
                            <option value="100">Top 100</option>
                        </Input>
                        </Col>
                        </FormGroup>
                    </Col>   
                </Form>
                </CardBody>
                <CardFooter>
                    <Button type="submit" size="sm" color="success" onClick={this.onSave}><i className="fa fa-dot-circle-o"></i> Submit</Button>
                </CardFooter>
                </Card>
            </Col>
            <Col xs="12" lg="12">
                <Card>
                    <CardHeader>
                    Filter Bar Chart
                    <div className="card-header-actions">
                        <a href="http://www.chartjs.org" className="card-header-action">
                        <small className="text-muted">docs</small>
                        </a>
                    </div>
                    </CardHeader>
                    <CardBody>
                    <div className="chart-wrapper">
                        <Bar data={bar} options={options} />
                    </div>
                    </CardBody>
                </Card>
            </Col>
           
            <Col xs="12" sm="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Top booking hotel
              </CardHeader>
              <CardBody>
              <BootstrapTable data={chartFilter} pagination options={ { noDataText: 'This is custom text for empty data',exportCSVBtn: this.createCustomExportCSVButton } } exportCSV>
             <TableHeaderColumn isKey dataField='time' dataSort={ true }>Date</TableHeaderColumn>
            <TableHeaderColumn dataField='Amount' dataSort={ true }>Amount</TableHeaderColumn>
            </BootstrapTable>
              </CardBody>
            </Card>
            </Col>
                </Row>
            </div>
    )
  }
}

export default Charts;
