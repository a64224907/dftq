import React, { Component } from 'react'
import ajax from '../../api/ajax'
import {Button,Card,Table} from 'antd'
import {
  PlusOutlined
} from '@ant-design/icons';
export default class Weapon extends Component {
  state = {
    weaponList:[],
    loading:false,
    subWeaponList:[],
    parentId:'0',
    parentName:''
  }
  getCategoryList = async() => {
    const {parentId} = this.state
    this.setState({loading:true})
    const result = await ajax('manage/category/list?parentId='+parentId)
    this.setState({loading:false})
    if(parentId === '0') {
      this.setState({weaponList:result.data})
    } else {
      this.setState({subWeaponList:result.data})
    }
    console.log(result);
  }
  componentDidMount() {
    this.getCategoryList()
  }
  showSubWeaponList = weaponList => {
    this.setState({
      parentId:weaponList._id,
      parentName:weaponList.name
    })
    this.getCategoryList()
  }
  initColumns =() => {
    this.columns = [
      {
        title: '武器1',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: weaponList => (
          <span>
            <Button type="link">修改武器</Button>
            <Button onClick={()=> this.showSubWeaponList(weaponList)} type="link">查看武器</Button>
          </span>
        ),
      },
    ];
  }
  componentWillMount() {
    this.initColumns()
  }
  render() {
    const {weaponList,loading} = this.state
    
    
    return (
      <Card  title="武器列表" extra={<Button icon={<PlusOutlined />}type="link">添加</Button>} style={{ width: '100%' }}>
          <Table loading={loading} rowKey='_id' bordered dataSource={weaponList} columns={this.columns} pagination={{showQuickJumper:true,defaultPageSize:5}} />;

    </Card>
    )
  }
}
