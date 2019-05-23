import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
// import {
//   GetAllRolesAction, DeleteAction as DeleteRoleAction, AddAction as AddRoleAction
// } from "../../action/adminAction";
// import LaddaButton, {
//   SLIDE_DOWN } from 'react-ladda';
import { Button, Icon, Table, Modal, Row, Input, Col,Select, Form ,Tag} from 'antd';
import {getAllRole,createRole,updateRole} from '../api/role';
const { Column } = Table;
const FormItem = Form.Item;
const Option = Select.Option;

class RoleManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      masterData: [],
      confirmLoading: false,
      handleCancel: false,
      visible: false,
      roleSelected: {},
      enableAddRole: false,
      newRole: '',
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    getAllRole().then((res) => {
    // let result = [];
    // result.push({role: 'ADMIN',username: 'admin'});
    // result.push({role: 'USER',username: 'username'});
        let result = res.data;
        result.map(re=>{
          var array = re.role.split(",");
          return re.role=array
        
        })
        let data = [];
        const roles = result;
        for (let i = 0; i < roles.length; i++) {
          data.push({
            key: i.toString(),
            role: roles[i].role,
            username: roles[i].username,
          });
        }
        this.setState({
          roles: result,
          data: data,
          masterData: data,
        })
    })
  }

  handleDeleteRole = () => {
    const record = this.state.roleSelected;
    this.props.DeleteRoleAction(record.role).then((result)=> {
      let data = [];
      const roles = result;
      for (let i = 0; i < roles.length; i++) {
        data.push({
          key: i.toString(),
          role: roles[i].role,
        });
      }
      this.setState({
        roles: result,
        data: data,
        masterData: data,
        visible: false,
        roleSelected: {},
      })
    })
  }

  handleReset = () => {
    this.setState({
      confirmLoading: false,
      handleCancel: false,
      visible: false,
      enableAddRole: false,
      roleSelected: {},
      newRole: '',
    })
  }

  searchInResult = (input) => {
    let dataFilters = [];
    if (this.state.data && input && input.target.value) {
      for (let i = 0; i < this.state.data.length; i++) {
        if ( this.state.data[i].username.toLowerCase().indexOf(input.target.value.toLowerCase()) > -1) {
          dataFilters.push(this.state.data[i]);
        }
      }
      if(dataFilters) {
        this.setState({
          data: dataFilters
        });
      }
    }

    if (!input || !input.target.value) {
      this.setState({
        data: this.state.masterData
      });
    }
  }

  handleAddRole = () => {
    if (this.state.newRole) {
      console.log(this.state.newRole);
      createRole(this.state.newRole).then((result)=> {
        let data = [];
        const roles = result;
        for (let i = 0; i < roles.length; i++) {
          data.push({
            key: i.toString(),
            role: roles[i].role,
            username: roles[i].username,
          });
        }
        this.setState({
          roles: result,
          data: data,
          masterData: data,
        })
      });
      this.setState({
        confirmLoading: false,
        handleCancel: false,
        visible: false,
        enableAddRole: false,
        enableEditRole:false,
        roleSelected: {},
        newRole: '',
      })
    }
  }
   findIndex =(roles, id)=>{
    var result=-1;
    roles.forEach((role,index)=>{
      if(role.username===id){
        result=index;
      }
    });
    return result;
  }
  handleEditRole=()=>{
    var roleUpdate={
      username:this.state.roleSelected.username,
      role:this.state.valueRoleSelect
    }
    updateRole(roleUpdate).then(_=>{
      let data=this.state.data;
      let index= this.findIndex(data, roleUpdate.username);
      let temp={
        key: index,
        role: roleUpdate.role.split(","),
        username: roleUpdate.username,
      };
      data[index]= temp;
      this.setState({
        data: data,
        masterData: data,
      })
    })
    this.setState({
      confirmLoading: false,
      handleCancel: false,
      visible: false,
      enableEditRole:false,
      roleSelected: {},
      valueRoleSelect: '',
    })
  }
  handleChange=(value)=> {
    this.setState({valueRoleSelect:value.toString()})
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row gutter={24}>
          <Col span={8}>
            <Input placeholder="Nhập để tìm" onChange={(value) => this.searchInResult(value)}/>
          </Col>
          <Col span={12}>
          </Col>
          <Col span={3}>
            <Button disabled type="info" size="large" className="newbtn" onClick={()=>this.setState({enableAddRole: true})} >Thêm mới</Button>
          </Col>
        </Row>
        <Table
            scroll={{ y: 'calc(90vh - 230px)' }}
            bordered={true}
            rowKey={record => record.username}
            dataSource={this.state.data}
            pagination={false}>
            <Column width="30%" title="Username" dataIndex="username" key="username" />
            <Column width="30%" title="Role" dataIndex="role" key="role" 
            render={(role) => (
              <span>
                {role.map(tag => {
                  let color = tag.length > 4 ? 'geekblue' : 'green';
                  if (tag === 'USER') {
                    color = 'volcano';
                  }
                  return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
                })}
              </span>
            )}
            />
            <Column width="20%" title="Action" key="action"
              render={(text, record) => (
                <span>
                  <Button type="dashed"
                    onClick={() =>{ 
                      this.setState({enableEditRole: true, roleSelected: record})
                      this.props.form.resetFields()
                    }}>
                    <Icon type="edit" style={{color:"blue"}} />
                  </Button>
                  <Button disabled type="dashed"
                    onClick={() => this.setState({visible: true, roleSelected: record})}>
                    <Icon type="delete" style={{color:"red"}} />
                  </Button>
                </span>
              )} />
        </Table>
        <Modal title="Xác Nhận"
              visible={this.state.visible}
              onOk={() => this.handleDeleteRole()}
              confirmLoading={this.state.confirmLoading}
              onCancel={()=>this.setState({visible: false, roleSelected: {}})}
              >
            <p>Bạn chắc chắn xoá role {this.state.roleSelected.role} chứ?</p>
        </Modal>
        <Modal title="Chỉnh sửa"
              visible={this.state.enableEditRole}
              onOk={() => this.handleEditRole()}
              confirmLoading={this.state.confirmLoading}
              onCancel={()=>this.setState({enableEditRole: false, roleSelected: {}, newRole: ''})}
              >
              <p >Username</p>
              <Input value={this.state.roleSelected.username} disabled/>

              <FormItem>
              <p style={{ paddingTop:20  }}>Role</p>
              {getFieldDecorator('select', {
                initialValue: this.state.roleSelected.role
              })(<Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={this.handleChange}
              >
               <Option value="ADMIN">ADMIN</Option>
                <Option value="USER">USER</Option>
                <Option value="CS">CS</Option>
                <Option value="EXECUTOR">EXECUTOR</Option>
                <Option value="MODERATOR">MODERATOR</Option>
                <Option value="OPERATION">OPERATION</Option>
                <Option value="PROMOTION">PROMOTION</Option>
              </Select>)}
            </FormItem>

              

        </Modal>
        <Modal title="Thêm mới"
              visible={this.state.enableAddRole}
              onOk={() => this.handleAddRole()}
              confirmLoading={this.state.confirmLoading}
              onCancel={()=>this.setState({enableAddRole: false, roleSelected: {}, newRole: ''})}
              >
              <p >Username</p>
              <Input value={this.state.newRole} onChange={(event)=>this.setState({newRole: event.target.value})}/>
              <Select defaultValue="ADMIN" style={{ width: 250, paddingTop:20 }} onChange={this.handleChange}>
                <Option value="ADMIN">ADMIN</Option>
                <Option value="USER">USER</Option>
                <Option value="CS">CS</Option>
            </Select>
        </Modal>
      </div>
    );
  }
}
const FRoleManagement = Form.create()(RoleManagement);
export default FRoleManagement;