import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody, CardHeader, Col } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {getHotelTotal} from '../../api/room'
import swal from 'sweetalert';

class LineChart extends Component {
    constructor(props){
        super(props)
        this.state={
            checkMonth: false,
            chartHotelTotal:[]
        }
    }
    componentDidMount(){
        getHotelTotal().then(res=>{
            console.log(res.data);
            this.setState({chartHotelTotal: res.data})
        })

    }
    chartHotel=() =>{
      swal("Show chart tổng danh số của khách sạn", {
        buttons: {
          month: {
            text: "Theo Tháng!",
            value: "month",
          },
          week: {
            text: "Theo Tuần!",
            value: "week",
          },
        },
      })
      .then((value) => {
        // eslint-disable-next-line
        switch (value) { 
          case "month":
            swal("Gotcha!", "Pikachu was caught!", "success");
            //chartHotelMonth();
              this.setState({checkMonth:true})
            break;
          case "week":
            swal("Gotcha!", "Pikachu was caught!", "success");
           // chartHotelMonth();
            this.setState({checkMonth:true})
            break;
        }
      });
  };
  render() {
    var {chartHotelTotal,checkMonth}= this.state;
    const line = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
      datasets: [
        {
          label: 'Doanh số',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: chartHotelTotal,
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
    if(!checkMonth){
       // eslint-disable-next-line
      {this.chartHotel()}
      return (<div></div>)
    } 
    return (
      
      <div className="animated fadeIn">
     
       <Col xs="12" lg="12">
          <Card>
            <CardHeader>
            Show chart tổng doanh số của khách sạn theo từng tháng
              <div className="card-header-actions">
                <a href="http://www.chartjs.org" className="card-header-action">
                  <small className="text-muted">docs</small>
                </a>
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}

export default LineChart;
