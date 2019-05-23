import React, { Component } from 'react';
import { Bar, Line,Pie } from 'react-chartjs-2';
import {
  Button,
  CardHeader,
  Card,
  CardBody,
  CardFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Progress
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities'
import {getTotalBooking,getCountBookingMo,getCountBookingYear,getCountBookingTri,
  getRoomTypeChartAll, getRoomTypeChartYear,getRoomTypeChartMon,getRoomTypeChartTri} from '../api/booking'
const brandInfo = getStyle('--info')


// Card Chart 2
const cardChartData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: brandInfo,
      borderColor: 'rgba(255,255,255,.55)',
      data: [1, 180, 9, 17, 34, 22, 110],
    },
  ],
};

const cardChartOpts2 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent',
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        },

      }],
    yAxes: [
      {
        display: false,
        ticks: {
          display: false,
          min: Math.min.apply(Math, cardChartData2.datasets[0].data) - 5,
          max: Math.max.apply(Math, cardChartData2.datasets[0].data) + 5,
        },
      }],
  },
  elements: {
    line: {
      tension: 0.00001,
      borderWidth: 1,
    },
    point: {
      radius: 4,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Card Chart 3
const cardChartData3 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
      data: [78, 81, 80, 45, 34, 12, 40],
    },
  ],
};

const cardChartOpts3 = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        display: false,
      }],
    yAxes: [
      {
        display: false,
      }],
  },
  elements: {
    line: {
      borderWidth: 2,
    },
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
    },
  },
};

// Main Chart

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}
const MonthStr=['January','February','March','April','May','June','July','August','September','October','November','December']
const TrimesterStr=['1','2','3','4']
class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      totalBooking:0,
      txtselect1:'month',
      txtselect2:'1',
      txtselect3: new Date().getFullYear(),
      countBooking:0,
      dataPie1:[],
      dataPie2:[],
      dropdownOpen: false,
      radioSelected: 2,
      valuesSelect1:MonthStr,
      disabled: false
    };
  }
  componentDidMount(){
    getTotalBooking().then(res=>{
      this.setState({totalBooking: res.data.count});
    })
    getRoomTypeChartAll().then(res=>{
      this.setState({dataPie1: res.data});
    })
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
    let txtselect1= this.state.txtselect1
    let txtselect2=this.state.txtselect2
    let txtselect3=this.state.txtselect3
    if(txtselect1==='month'){
      getCountBookingMo(txtselect2,txtselect3).then(res=>{
        this.setState({countBooking:res.data.count})
      })
      getRoomTypeChartMon(txtselect2,txtselect3).then(res=>{
        this.setState({dataPie2:res.data})
      })
      
    }
    if(txtselect1==='trimester'){
      getCountBookingTri(txtselect2,txtselect3).then(res=>{
        this.setState({countBooking:res.data.count})
      })
      getRoomTypeChartTri(txtselect2,txtselect3).then(res=>{
        this.setState({dataPie2:res.data})
      })
    }
    if(txtselect1==='year'){
      getCountBookingYear(txtselect3).then(res=>{
        this.setState({countBooking:res.data.count})
      })
      getRoomTypeChartYear(txtselect3).then(res=>{
        this.setState({dataPie2:res.data})
      })
    }
    //console.log(txtselect1)
    //console.log(txtselect2)
    //console.log(txtselect3)
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected,
    });
  }
  onSelect1Change=(e)=>{
    var target=e.target;
    var name=target.name;
    var value=target.value;
    if(value==='month'){
      this.setState({valuesSelect1:MonthStr,
        disabled: false
      })
    }
    if(value==='trimester'){
      this.setState({valuesSelect1:TrimesterStr,
        disabled: false,
        txtselect2:'1'
      })
    }
    if(value==='year'){
      this.setState({valuesSelect1:[],
        disabled: true,
        txtselect2:''
      })
    }
    this.setState({
        [name]: value
    });
  }
  showSelect= (values)=> {
    const listItems = values.map((item,index) =>{
      return(
      <option key= {item} value={index+1}>
        {item}
      </option>
      )
    })
    return listItems;
  }
  showSelect3= (values)=> {
    const listItems = values.map((item) =>{
      return(
      <option key= {item} value={item}>
        {item}
      </option>
      )
    })
    return listItems;
  }
  getYearCurrent=()=>{
    let yearnow=new Date().getFullYear();
    const listYear=[yearnow,yearnow-1,yearnow-2];
    return listYear;
  }
  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  
  render() {
    var {valuesSelect1,totalBooking,countBooking,dataPie1,dataPie2}=this.state
    var percentBooking=parseInt((countBooking/totalBooking*1.0)*100)
    const pie1 = {
      labels: ["Single", "Double", "Three", "Tập thể"],
      datasets: [
        {
          data: dataPie1,
          backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#3cba9f',],
          hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#3cba9f',],
        }],
    };
    const pie2 = {
      labels: ["Single", "Double", "Three", "Tập thể"],
      datasets: [
        {
          data:dataPie2,
          backgroundColor: ['#FF6384','#36A2EB','#FFCE56','#3cba9f',],
          hoverBackgroundColor: ['#FF6384','#36A2EB','#FFCE56','#3cba9f',],
        }],
    };
    
    const bar = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            ],
          borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
        borderWidth: 1,
            hoverBorderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    
    const options = {
      tooltips: {
        enabled: false,
        custom: CustomTooltips
      },
      maintainAspectRatio: false,
      resposive: true
    }
    return (
      <div className="animated fadeIn">
        <Row>
        <Col xs="12" md="12">
              <Card>
                <CardBody>
                <Form className="form-horizontal">
                    <Col md="12" xs="12">
                        <FormGroup row>
                        <Col xs="4" md="4">
                        <Input type="select" name="txtselect1" id="ccmonth" onChange={this.onSelect1Change}>
                            <option value="month">Month</option>
                            <option value="trimester">Trimester</option>
                            <option value="year">Year</option>
                        </Input>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="select" name="txtselect2" id="ccmonth" disabled={this.state.disabled} onChange={this.onChange}>
                        {this.showSelect(valuesSelect1)}
                        </Input>
                        </Col>
                        <Col xs="4" md="4">
                        <Input type="select" name="txtselect3" id="ccmonth" onChange={this.onChange}>
                        {this.showSelect3(this.getYearCurrent())}
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
          <Col xs="12" sm="6" lg="6">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
                <div className="text-value">{totalBooking}</div>
                <div>Tổng số lần đặt phòng của hệ thống</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                <Line data={cardChartData2} options={cardChartOpts2} height={70} />
              </div>
            </Card>
          </Col>
          
          <Col xs="12" sm="6" lg="6">
            <Card className="text-white bg-success">
              <CardBody className="pb-0">
                <div className="text-value">{countBooking}</div>
                <div>Tổng số lần đặt phòng của điều kiện trên</div> 
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                <Line data={cardChartData3} options={cardChartOpts3} height={70} />
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col xs="12" md="12">
          <Card>
            <CardHeader>
              Pie Chart
            </CardHeader>
            <CardBody>
              <Row>
            <Col xs="12" sm="6" lg="6">
              <div className="chart-wrapper">
                Tỉ lệ loại phòng của hệ thống
                <Pie data={pie1} />
              </div>
              </Col>
              <Col xs="12" sm="6" lg="6">
              <div className="chart-wrapper">
              Tỉ lệ loại phòng của điều kiện
                <Pie data={pie2} />
              </div>
              </Col>
              </Row>
            </CardBody>
          </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" sm="6" lg="6">
            <Card>
                <CardHeader>
                  Bar Chart
                </CardHeader>
                <CardBody>
                  <div className="chart-wrapper">
                    <Bar height={300} data={bar} options={options} />
                  </div>
                </CardBody>
            </Card>
          </Col>
          <Col xs="12" sm="6" lg="6">
            <Card>
                <CardHeader>
                  Rank
                </CardHeader>
                <CardBody>
                <ul>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-user progress-group-icon"></i>
                          <span className="title">Booking</span>
                          <span className="ml-auto font-weight-bold">{percentBooking}%</span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value={percentBooking} />
                        </div>
                      </div>
                      <div className="progress-group mb-5">
                        <div className="progress-group-header">
                          <i className="icon-user-female progress-group-icon"></i>
                          <span className="title">Female</span>
                          <span className="ml-auto font-weight-bold">37%</span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="success" value="37" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-globe progress-group-icon"></i>
                          <span className="title">Organic Search</span>
                          <span className="ml-auto font-weight-bold">191,235 <span className="text-muted small">(56%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="info" value="56" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-facebook progress-group-icon"></i>
                          <span className="title">Facebook</span>
                          <span className="ml-auto font-weight-bold">51,223 <span className="text-muted small">(15%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="15" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-twitter progress-group-icon"></i>
                          <span className="title">Twitter</span>
                          <span className="ml-auto font-weight-bold">37,564 <span className="text-muted small">(11%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="11" />
                        </div>
                      </div>
                      <div className="progress-group">
                        <div className="progress-group-header">
                          <i className="icon-social-linkedin progress-group-icon"></i>
                          <span className="title">LinkedIn</span>
                          <span className="ml-auto font-weight-bold">27,319 <span className="text-muted small">(8%)</span></span>
                        </div>
                        <div className="progress-group-bars">
                          <Progress className="progress-xs" color="warning" value="8" />
                        </div>
                      </div>
                      <div className="divider text-center">
                        <Button color="link" size="sm" className="text-muted" data-toggle="tooltip" data-placement="top"
                                title="" data-original-title="show more"><i className="icon-options"></i></Button>
                      </div>
                    </ul>
                </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
