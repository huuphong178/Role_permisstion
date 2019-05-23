import React, { Component } from 'react';
import {Card, Col, Row,Button } from 'reactstrap';
import RoomList from './RoomList'
import RoomItem from './RoomItem'
import {connect} from 'react-redux'; 
import {Link} from 'react-router-dom';
import {actFetchRoomsRequest, actDeleteRoomRequest} from '../../actions/index'
class Roomtable extends Component {
  constructor(props){
    super(props);
    this.state={
        rooms: []
    }
  }
  componentDidMount(){
    this.props.fetchAllRooms()
  }
  render() {
     var { rooms }= this.props;
   // var { rooms }=this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Button color="success" className="newbtn" >
          <Link to="/addroom" color="success">
             NEW
          </Link>
          </Button>
          <Col xs="12" lg="12">
            <Card>
                  <RoomList>
                   {this.showRooms(rooms)}
                  </RoomList>
            </Card>
          </Col>

        </Row>
      </div>

    );
  }

  showRooms= (rooms)=> {
    var result=null;
    if(rooms.length > 0 ){
      result= rooms.map((room, index)=>{
        return (
          <RoomItem 
          key={index}
          room={room}
          index={index}
          onDelete={this.onDelete}
          />
        )
      }) 
    }
    return result;
  }
  onDelete=(id)=>{
    this.props.onDeleteRoom(id);
  }
  
}
const mapStateToProps = state => {
  return{
    rooms : state.rooms
  }
}
const mapDispatchToProps=(dispatch, props) =>{
  return {
    fetchAllRooms : () =>{
      dispatch(actFetchRoomsRequest());
    },
    onDeleteRoom: (id)=>{
      dispatch(actDeleteRoomRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roomtable);
