import React, {Component} from 'react';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { Button, Icon, Table, Modal, Row, Input, Col,Select,Tag, Form} from 'antd';
//import nav_roles from '../containers/Sidebar/_nav_roles';
import {getAllNavRole,updateNavRole} from '../api/nav_role'
const { Column } = Table;
const FormItem = Form.Item;
const Option = Select.Option;

class NavManagement extends Component {
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
      valueRoleSelect:''
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    getAllNavRole().then((res) => { 
      let result = res.data;
      result.map(re=>{
        var array = re.roles.split(",");
        return re.roles=array
      
      })
     // let result = nav_roles.items_roles;
      let data = [];
      const roles = result;
        for (let i = 0; i < roles.length; i++) {
        data.push({
          key: i.toString(),
          role: roles[i].roles,
          name: roles[i].name,
        });
      }
      this.setState({
        roles: result,
        data: data,
        masterData: data,
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
      valueRoleSelect: '',
    })
  }

  searchInResult = (input) => {
    let dataFilters = [];
    if (this.state.data && input && input.target.value) {
      for (let i = 0; i < this.state.data.length; i++) {
        if ( this.state.data[i].name.toLowerCase().indexOf(input.target.value.toLowerCase()) > -1) {
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
  findIndex =(roles, id)=>{
    var result=-1;
    roles.forEach((role,index)=>{
      if(role.name===id){
        result=index;
      }
    });
    return result;
  }
  handleEditRole=()=>{
    var roleUpdate={
      name:this.state.roleSelected.name,
      roles:this.state.valueRoleSelect
    }
    updateNavRole(roleUpdate).then(_=>{
      let data=this.state.data;
      let index= this.findIndex(data, roleUpdate.name);
      let temp={
        key: index,
        role: roleUpdate.roles.split(","),
        name: roleUpdate.name,
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
        <Row gutter={24} className="newbtn">
          <Col span={8}>
            <Input placeholder="Nhập để tìm" onChange={(value) => this.searchInResult(value)}/>
          </Col>
          <Col span={12}>
          </Col>
        </Row>
        <Table
            scroll={{ y: 'calc(90vh - 230px)' }}
            bordered={true}
            rowKey={record => record.key}
            dataSource={this.state.data}
            pagination={false}>
            <Column width="30%" title="Name Navbar" dataIndex="name" key="name" />
            <Column width="50%" title="Role" dataIndex="role" key="role"
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
            )}/>
            <Column width="20%" title="Action" key="action"
              render={(text, record) => (
                <span>
                  <Button type="dashed"
                    onClick={() =>{ this.setState({enableEditRole: true, roleSelected: record})
                    this.props.form.resetFields()
              }}>
                    <Icon type="edit" style={{color:"red"}} />
                  </Button>
                </span>
              )} />
        </Table>
        <Modal title="Chỉnh sửa"
              visible={this.state.enableEditRole}
              onOk={() => this.handleEditRole()}
              confirmLoading={this.state.confirmLoading}
              onCancel={()=>{
                this.setState({enableEditRole: false, roleSelected: {}, valueRoleSelect: ''})
              }}
              >
              <p >Name</p>
              <Input disabled value={this.state.roleSelected.name}/>
              <FormItem>
              <p  style={{ paddingTop: 20}} >Role</p>
                {getFieldDecorator('select',{
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
      </div>
    );
  }
}
const FNavManagement = Form.create()(NavManagement);
export default FNavManagement;