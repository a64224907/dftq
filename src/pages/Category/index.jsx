import React, { Component, Fragment } from 'react'
import ajax from '../../api/ajax'
import {Button,Card,Table,Modal, message} from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons';
import AddForm from './AddForm'
import UpdateForm from './UpdateForm'
import LinkButton from '../../components/LinkButton'
import {
  PlusOutlined
} from '@ant-design/icons';
export default class Weapon extends React.PureComponent {
  state = {
    categorys:[],
    loading:false,
    subCategorys:[],
    parentId:'0',
    parentName:'',
    isAddFormModalVisible: false,
    showStatus:0
  }
  getCategoryList = async() => {
    const {parentId} = this.state
    this.setState({loading:true})
    const result = await ajax('manage/category/list?parentId='+parentId)
    this.setState({loading:false})
    if(parentId === '0') {
      this.setState({categorys:result.data})
    } else {
      this.setState({subCategorys:result.data})
    }
    console.log(result);
  }
  componentDidMount() {
    this.getCategoryList()
  }
  showSubCategory = category => {
    this.setState({
      parentId:category._id,
      parentName:category.name
    },()=>{
      console.log(this.state.parentId);
      this.getCategoryList()
    })
    
  }
  initColumns =() => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        width: 300,
        render: category => (
          <span>
            <Button onClick={()=>this.showUpdate(category)} type="link">修改分类</Button>
            {
              this.state.parentId === '0' ? <Button onClick={()=> this.showSubCategory(category)} type="link">查看子分类</Button> : ''
            }
            
          </span>
        ),
      },
    ];
  }
  showUpdate = category => {
    this.category = category 
    this.setState({showStatus:2})

  }
    addCategory = async() => { 
    this.setState({showStatus:0})
      const data = this.form.current.getFieldsValue(true)
      const result = await ajax('manage/category/add',data,"POST")
      console.log(result);
      if (result.status===0) {
        // 3. 重新显示列表
        message.success('添加成功')
         // 添加的分类就是当前分类列表下的分类
         if(data.parentId===this.state.parentId) {
          // 重新获取当前分类列表显示
          this.getCategorys()
        } else if (data.parentId==='0'){ // 在二级分类列表下添加一级分类, 重新获取一级分类列表, 但不需要显示一级列表
          this.getCategorys('0')
        }
      } else {
      message.error('添加失败')
      }

  }
  updateCategory = async() => { 
    this.setState({showStatus:0})
    const categoryName = this.form.current.getFieldValue('categoryName')
    const {categoryId} = this.state
    const result = await ajax('manage/category/update',{categoryId,categoryName},'POST')
    console.log(result);
    if (result.status===0) {
      // 3. 重新显示列表
      message.success('修改成功')
      this.getCategoryList()
    } else {
    message.error('修改失败')
    }
  }
  handleCancel = () => {
    this.form.current.resetFields()
    this.setState({showStatus:0})
  }
  showCategorys = () => {
    this.setState({
      parentId:'0',
      parentName:'',
      subCategorys:[]
    })
  }
  componentWillMount() {
    this.initColumns()

  }
  render() {
    const {categorys,loading,showStatus,parentId,parentName,subCategorys} = this.state
    const category = this.category || {}
    const title = parentId === '0' ? '一级分类列表':(
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <ArrowRightOutlined /> 
        <span>{parentName}</span>
      </span>
    )
    return (
      <Fragment>

      <Card  title={title} extra={<Button onClick={() => {this.setState({showStatus:1})}} icon={<PlusOutlined />}type="primary">添加</Button>} style={{ width: '100%' }}>
          <Table loading={loading} rowKey='_id' bordered dataSource={  parentId === '0' ? categorys :subCategorys} columns={this.columns} pagination={{showQuickJumper:true,defaultPageSize:5}} />;

    </Card>
    <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
      <AddForm 
      categorys={categorys}
      parentId={parentId}
      setForm={(form) => {this.form = form}}
            />
    </Modal>
    <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
      <UpdateForm categoryName = {category.name}
            setForm={(form) => {this.form = form}}
            />
    </Modal>
    </Fragment>
    )
  }
}
