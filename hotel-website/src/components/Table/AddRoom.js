import React, { Component } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {actAddRoomRequest, actGetRoomRequest,actUpdateRoomRequest} from '../../actions/index'
import {connect} from 'react-redux'
class AddRoom extends Component {

    constructor(props){
        super(props)
        this.state={
            id: '',
            txtroomid: '',
            txtroomname: '',
            txtroomtype: '',
            txtroomstatus:'',
            txtdescription: '',
            redirectToReferrer: false
        }
    }
    componentDidMount(){
        console.log('componentDismoubnt')
        var { match} = this.props;
        if(match){
            var id=match.params.id;
            if(id){
                this.props.onEditRoom(id)
                // getOneRoom(id).then(res =>{
                //     var room=res.data
                //     this.setState({
                //         id: id,
                //         txtroomid: room.roomID,
                //         txtroomname: room.roomName,
                //         txtroomtype: room.roomType,
                //         txtroomstatus:room.isActive==='1' ? true: false,
                //         txtdescription: room.description,
                //     })
                // }) 
                
            }
            
        }
      }
      componentWillReceiveProps(nextProps){
          console.log('componentWillReceiveProps')
          if(nextProps && nextProps.itemEditing){
              var {itemEditing}= nextProps;
                this.setState({
                        id: itemEditing.roomID,
                        txtroomid: itemEditing.roomID,
                        txtroomname: itemEditing.roomName,
                        txtroomtype: itemEditing.roomType,
                        txtroomstatus:itemEditing.isActive=== '1' ? true: false,
                        txtdescription: itemEditing.description,
                    })
          }
      }
    onChange= (e) =>{
        var target=e.target;
        var name=target.name;
        var value=target.type ==='checkbox' ? target.checked : target.value;
       // var value=target.type ==='select' ? target.checked;
        console.log(value);
        this.setState({
            [name]: value
        });
    }
    onSave=(e)=>{
        e.preventDefault();
        console.log(this.state)
        var {id} = this.state;
        var data={
            roomID: this.state.txtroomid,
            roomName: this.state.txtroomname,
            roomType: this.state.txtroomtype,
            isActive: this.state.txtroomstatus === true ? '1' : '2',
            description: this.state.txtdescription
        }
        if(id){
            console.log('updating...')
            console.log(data)
            this.props.onUpdateRoom(data);
            this.setState({ redirectToReferrer: true });
        }else{
            this.props.onAddRoom(data);
            this.setState({ redirectToReferrer: true });
        }
    }
    render() {
        let { redirectToReferrer } = this.state;
        if (redirectToReferrer) return <Redirect to={'/rooms'} />;
        var { txtroomid, txtroomname, txtroomtype, txtroomstatus, txtdescription}= this.state;
        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xs="12" md="12">
                <Card>
               
                <CardHeader>
                    <strong>Form Room</strong>
                </CardHeader>
                <CardBody>
                <Form className="form-horizontal" onSubmit={this.onSave}>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="text-input">Room ID</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="text" id="text-input" 
                        name="txtroomid"
                        value={txtroomid}
                        onChange={this.onChange}
                         placeholder="Room ID" />
                        </Col>
                    </FormGroup>
                    </Col>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="text-input">Room Name</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="text" id="text-input" 
                        name="txtroomname"
                        value={txtroomname}
                        onChange={this.onChange}
                         placeholder="Room Name" />
                        </Col>
                    </FormGroup>
                    </Col>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="text-input">Room Type</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="select" name="txtroomtype" id="ccmonth" value={txtroomtype} onChange={this.onChange}>
                        <option value="1">1:single</option>
                            <option value="2">2:double</option>
                            <option value="3">3:three</option>
                            <option value="4">4:tap the</option>
                        </Input>
                        </Col>
                    </FormGroup>
                    
                    </Col>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label>Room Status</Label>
                        </Col>
                        <Col md="9">
                        <Input type="checkbox" 
                        name="txtroomstatus"
                        value={txtroomstatus}
                        onChange={this.onChange}
                         placeholder="Room Name" >
                        </Input>
                        Active
                        </Col>
                    </FormGroup>
                    </Col>
                    <Col md="8" xs="6">
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="text-input">Description</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="text" id="text-input" 
                        name="txtdescription"
                        value={txtdescription}
                        onChange={this.onChange}
                         placeholder="Description" />
                        </Col>
                    </FormGroup>
                    </Col>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
                    <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
                </Form>
                </CardBody>
                <CardFooter>
                   
                </CardFooter>
                </Card>
            </Col>
                </Row>
            </div>
        );
    }
}
const mapStateToProps=state=>{
    return{
        itemEditing: state.itemEditing
    }
}
const mapDispatchToProps= (dispatch, props)=>{
    return{
        onAddRoom:(room)=>{
            dispatch(actAddRoomRequest(room));
        },
        onEditRoom:(id)=>{
            dispatch(actGetRoomRequest(id));
        },
        onUpdateRoom:(room)=>{
            dispatch(actUpdateRoomRequest(room));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddRoom);