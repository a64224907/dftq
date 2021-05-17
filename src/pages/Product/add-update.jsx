import { Card,Cascader,Form,Input, Upload,Button } from 'antd'
import React, { Component, Fragment } from 'react'
import {IMG_BASE} from '../../constant'
import LinkButton from '../../components/LinkButton'
import PictureWall from './PictureWall'
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import ajax from '../../api/ajax';
import { options } from 'less';
const Item = Form.Item
const {TextArea} = Input
export default class detail extends Component {
  state ={
    options:[]
  }
  numberValidator = async(a,val) => {
    console.log(val*1);
    if (val*1 <0) {
      return Promise.reject(new Error('必须大于0'));
    }
  }
  initOptions = async categorys =>{
  const options =  categorys.map(c=>({
      value:c._id,
      label:c.name,
      isLeaf:false
    }))
    const {isUpdate,product} = this
    const {pCategoryId} = product
    if(isUpdate&&pCategoryId!=='0') {
      const subCategorys = await this.getCategoryList(pCategoryId)
      const childOptions = subCategorys.map(c=>({
        value:c._id,
      label:c.name,
      isLeaf:true
      }))
      const targetOption = options.find(option=>option.value === pCategoryId )
      targetOption.children = childOptions
    }
    this.setState({
      options:[...options]
    })
  }
  getCategoryList = async parentId => {
    const result = await ajax('/manage/category/list',{parentId})
    const categorys = result.data
    if(parentId==='0') {
      this.initOptions(categorys)
    }else{
      return categorys
    }
  }
  loadData = async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
   const subCategorys = await this.getCategoryList(targetOption.value)
   if(subCategorys&&subCategorys.length>0) {
    const childOptions =  subCategorys.map(c=>({
      value:c._id,
      label:c.name,
      isLeaf:true
     }))
     targetOption.children = childOptions
   }else{
      targetOption.isLeaf=true
   }
    // load options lazily
    
      this.setState({
        options:[...this.state.options]
      })
    }
  onChange = () =>{

  }
  onFinish = (a) =>{
    console.log(a);
  }
  componentWillMount() {
    const product = this.props.location.state
    this.isUpdate = !!product
    this.product = product || {}
    
  }
  componentDidMount() {
    this.getCategoryList('0')
  }
  render() {
    console.log(this.props.location);
    const {options} = this.state
    const {isUpdate} = this
    const categorys = []
    const {desc,detail,imgs,name,price,pCategoryId,categoryId} =this.product
    if(this.isUpdate) {
      if(pCategoryId===0) {
        categorys.push(pCategoryId)
      }else {
        categorys.push(pCategoryId,categoryId)
      }
    }
    const title = (
      <Fragment>
        <LinkButton onClick={()=>this.props.history.goBack()}>
        <ArrowLeftOutlined style={{color:'#1DA57A',marginRight:'15px'}} />
        
        </LinkButton>
        <span>{isUpdate? '修改':'添加'}商品</span>
      </Fragment>
    )
    return (
     <Fragment>
       <Card title={title}>
        <Form labelAlign={{span:2}} wrapperCol={{span:5}} onFinish={this.onFinish}>
          <Item label="商品名称" name="name" rules={[{required:true,message:'请输入商品名称'}]} initialValue={name} >
              <Input/>
          </Item>
          <Item label="商品描述" name="desc" rules={[{required:true,message:'请输入商品描述'}]} initialValue={desc}>
              <TextArea/>
          </Item>
          <Item label="商品价格" name="price" initialValue={price} rules={[{  required:true,message:'请输入商品价格'},{validator:this.numberValidator}]}>
              <Input type="number" min={0} addonAfter="元"/>
          </Item>
          <Item  label="商品分类" name="categoryId" initialValue={categorys} rules={[{required:true,message:'请选择商品分类'}]}>
              <Cascader loadData={this.loadData} onChange={this.onChange} changeOnSelect options={options}  />
          </Item>
          <Item label="商品图片" name="imgs" 
          // initialValue={imgs}
          // rules={[{required:true,message:'请上传商品图片'}]}
          >
             <PictureWall/>
          </Item>
          <Item label="商品详情" name="detail" rules={[{required:true,message:'请输入商品详情'}]}>
              <Input/>
          </Item>
          <Button htmlType="submit" type="primary">{isUpdate? '修改':'添加'}</Button>
        </Form>
       </Card>
     </Fragment>
    )
  }
}
