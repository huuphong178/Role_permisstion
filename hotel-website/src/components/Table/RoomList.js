import React, { Component } from 'react';
import {CardBody, Table } from 'reactstrap';


class RoomList extends Component {
  render() {
    return (
              <CardBody>
                <Table id="myTable001" responsive bordered >
                  <thead>
                  <tr>
                    <th>RoomID</th>
                    <th>RoomName</th>
                    <th>RoomType</th>
                    <th>CreateDate</th>
                    <th>UpdateDate</th>
                    <th>Status</th>
                    <th>Decription</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    {this.props.children}
                  </tbody>
                </Table>
                {/* <Pagination>
                  <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem className="page-item"><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination> */}
              </CardBody>
    );
  }
}
export default RoomList;
