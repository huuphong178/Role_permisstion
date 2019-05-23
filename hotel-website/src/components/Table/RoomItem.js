import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';
import {Button } from 'reactstrap';
class RoomItem extends Component {
  onDelete=(id)=>{
   swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      this.props.onDelete(id);
    } else {
      swal("Your imaginary file is safe!");
    }
  });
  }
  render() {
      var room = this.props.room;
    return (
                  <tr>
                    <td>{room.roomID}</td>
                    <td>{room.roomName}</td>
                    <td>{room.roomType}</td>
                    <td>{room.createDate}</td>
                    <td>{room.updateDate}</td>
                    <td>{room.isActive}</td>
                    <td>{room.description}</td>
                    <td>
                    <Button className="right" color="primary">
                    <Link
                      to={`/editroom/${room.roomID}`}
                    >
                    Edit
                    </Link>
                   
                    </Button>
                    <Button color="danger"
                      onClick={()=> this.onDelete(room.roomID)}
                    >Delete</Button>
                </td>
                  </tr>
    );
  }
}

export default RoomItem;
