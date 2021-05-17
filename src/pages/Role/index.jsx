
import React, { Component,createRef } from 'react'
import {Card,Table,Button ,Modal, message } from "antd";
import AddForm from './add-form'
import {
  PlusOutlined
} from '@ant-design/icons';
import {dateFormat} from '../../util/dateUtils'
import ajax from '../../api/ajax';
import AuthForm from './auth-form';
export default class Role extends Component {
  state ={
    roles:[],
    total:0,
    role:{},
    showAdd:false,
    showUpdate:false
  }
  initColumns =() => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: (create_time) =>(
          <span>{dateFormat(create_time)}</span>
        )
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: (auth_time) =>(
          <span>{dateFormat(auth_time)}</span>
        )
      },
      {
        title: '授权人',
        dataIndex:'auth_name',
      },
    ];
  }
   auth = createRef()
  getRolesList = async() => {
    const result = await ajax('/manage/role/list') 
    console.log(result);
    this.setState({roles:result.data,total:result.data.length})
  }
  onRow = (role) => {
    return {
      onClick:event=>{
        console.log(role);
        this.setState({
          role
        })
      }
    }
  }
  updateAuth = async() => {
    const role = this.state.role
    const menus = this.auth.current.getMenus()
    const {auth_name,auth_time,_id} = role
    this.setState({showUpdate:false})
    const result = await ajax('/manage/role/update',{menus,auth_time,auth_name,_id},'POST')
    if(result.status === 0) {
      message.success('设置成功')
    }else {
      message.error('设置失败')
    }
  }
  handleCancel = () =>{
    this.setState({
      showAdd:false
    })
    this.form.current.resetFields()
  }
  addRole =async() =>{
    const roleName = this.form.current.getFieldValue('roleName')
    const result = await ajax('/manage/role/add',{roleName},'POST')
    this.getRolesList()
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getRolesList()
  }
  render() {
    const {roles,total,role,showAdd,showUpdate} = this.state
    const length = Object.keys(role).length
    const title = (
      <span>
        <Button onClick={()=>{this.setState({showAdd:true})}} type="primary">创建角色</Button> &nbsp;
        <Button onClick={()=>{this.setState({showUpdate:true})}} type="primary" disabled={length===0}>设置角色权限</Button>
      </span>
    )
    return (
      <Card  title={title} extra={<Button  icon={<PlusOutlined />}type="primary" onClick={()=>{this.props.history.push('/product/addupdate')}}>添加商品</Button>} style={{ width: '100%' }}>
          <Table onRow={this.onRow} rowSelection={{type:'radio',selectedRowKeys:[role._id]}}  rowKey='_id' bordered dataSource={roles}  columns={this.columns} pagination={{showQuickJumper:true,defaultPageSize:5,total:total}} />;
          <Modal title="创建角色" visible={showAdd} onOk={this.addRole} onCancel={this.handleCancel}>
      <AddForm 
      setForm={(form) => {this.form = form}}
            />
    </Modal>
    <Modal title="设置权限" visible={showUpdate} onOk={this.updateAuth} onCancel={()=>{this.setState({showUpdate:false})}}>
      <AuthForm 
      ref={this.auth}
           role={role}
            />
    </Modal>
    </Card>
    )
  }
}
