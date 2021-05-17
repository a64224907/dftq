import React, { Component,Fragment } from 'react'
import {Card,Button,Table,Modal, Select,Input, message} from 'antd'
import ajax from '../../api/ajax'
import product from './detail'
import LinkButton from '../../components/LinkButton'
import {
  PlusOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const {Option} = Select
export default class Skin extends Component {
  state = {
    productList:[],
    pageNum:'1',
    pageSize:'3',
    total:0,
    productType:'productName',
    searchName:''
  }
  changeState = async product => {
    console.log(product);
    const{_id,status} = product
    const newStatus = status === 1? 2:1
    const result = await ajax('/manage/product/updateStatus',{status:newStatus,productId:_id},'POST')
    if(result.status === 0) {
      message.success('修改成功')
      this.getProductList(this.pageNum)
    }
  }
  getProductList = async(pageNum) => {
    this.pageNum = pageNum
    const {pageSize,productType,searchName} = this.state
    if(searchName) {
      console.log(productType,searchName);
    const result = await ajax('manage/product/search',{pageNum,pageSize,productType,productDesc:searchName})
      this.setState({productList:result.data.list,total:result.data.total})
    }else{
    const result = await ajax('manage/product/list',{pageNum,pageSize})

    this.setState({productList:result.data.list,total:result.data.total})
  }
  }
  initColumns =() => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        width:100,
        dataIndex:'price',
        render:price => '$'+price
      },
      {
        title: '状态',
        width:100,
        render:product => {
         return  (
            <Fragment>
              <Button onClick={()=>{this.changeState(product)}} type="primary">{product.status === 1?'上架':'下架'}</Button>
            <span>{product.status === 1?'已下架':'在售'}</span>
            </Fragment>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: product => (
          <span>
             <LinkButton onClick={() => this.props.history.push({pathname:'/product/detail',state:{product}})}>详情</LinkButton>
              <LinkButton onClick={() => this.props.history.push('/product/addupdate', product)}>修改</LinkButton>
            
          </span>
        ),
      },
    ];
  }
  change = (e)  =>{
this.setState({searchName:e.target.value})
  }
  componentDidMount() {
    console.log(this.props);
    this.getProductList(1)
  }
  componentWillMount() {
    this.initColumns()

  }
  render() {
    const {productList,total,searchName,productType} = this.state
    const title = (
      <Fragment>
        <Select defaultValue={productType} style={{width:200}} onChange={(val)=>{this.setState({productType:val})}}>
        <Option value ='productName' >按名称搜索</Option>
        <Option value ='productDesc' >按描述搜索</Option>
      </Select>
      <Input value={searchName} onChange={this.change} placeholder="关键字" style={{width:200,margin:'0px 15px'}}/>
      <Button type="primary" onClick={()=>{this.getProductList(1)}} >搜索</Button>
      </Fragment>
    )
    return (
      <Fragment>

      <Card  title={title} extra={<Button  icon={<PlusOutlined />}type="primary" onClick={()=>{this.props.history.push('/product/addupdate')}}>添加商品</Button>} style={{ width: '100%' }}>
          <Table  rowKey='_id' bordered dataSource={productList} onChange={(val)=>{this.getProductList(val.current)}}  columns={this.columns} pagination={{showQuickJumper:true,defaultPageSize:5,total:total}} />;

    </Card>
    {/* <Modal title="添加分类" visible={showStatus===1} onOk={this.addCategory} onCancel={this.handleCancel}>
      <AddForm 
      categorys={categorys}
      parentId={parentId}
      setForm={(form) => {this.form = form}}
            />
    </Modal> */}
    {/* <Modal title="更新分类" visible={showStatus===2} onOk={this.updateCategory} onCancel={this.handleCancel}>
      <UpdateForm categoryName = {category.name}
            setForm={(form) => {this.form = form}}
            />
    </Modal> */}
    </Fragment>
    )
  }
}
