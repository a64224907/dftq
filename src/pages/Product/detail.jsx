import { Card,List, } from 'antd'
import React, { Component, Fragment } from 'react'
import {IMG_BASE} from '../../constant'
import LinkButton from '../../components/LinkButton'
import {
  ArrowLeftOutlined
} from '@ant-design/icons';
import ajax from '../../api/ajax';
const Item = List.Item
export default class detail extends Component {
  state ={
    pName : '',
    subName:''
  }
  getCategoryName = async() => {
    const {categoryId,pCategoryId} = this.props.location.state.product
    console.log(pCategoryId,categoryId);
    if(pCategoryId === 0) {
      const result = await ajax('/manage/category/info',{categoryId})
      this.setState({pName:result.data.name})
    }
    else{
     const  results = await Promise.all([ajax('/manage/category/info',{categoryId:pCategoryId}),ajax('/manage/category/info',{categoryId})])
    console.log(results);
     this.setState({
      subName:results[1].data.name,
      pName:results[0].data.name
    })
    }
  }
  componentDidMount() {
    this.getCategoryName()
  }
  render() {
    const {desc,detail,imgs,name,price,_id} = this.props.location.state.product
    const {pName,subName} = this.state
    const title = (
      <Fragment>
        <LinkButton onClick={()=>this.props.history.push('/product')}>
        <ArrowLeftOutlined style={{color:'#1DA57A',marginRight:'15px'}} />
        
        </LinkButton>
        <span>商品详情</span>
      </Fragment>
    )
    return (
     <Fragment>
       <Card title={title}>
        <List>
          <Item>
             <span className="title">商品名称：</span> <span>{name}</span>
          </Item>
          <Item>
             <span className="title">商品描述：</span> <span>{desc}</span>
          </Item>
          <Item>
             <span className="title">商品价格：</span> <span>{price}</span>
          </Item>
          <Item>
             <span className="title">所属分类：</span> <span>{pName} {subName? '--->' :''} {subName}</span>
          </Item>
          <Item>
             <span className="title">商品图片：</span> 
             {
               imgs.map((img,index)=>{
                 return <img className="img" key={index} src={IMG_BASE+img} alt='img'></img>
               })
             }
          </Item>
          <Item>
             <span className="title">商品详情：</span> <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </Item>
        </List>
       </Card>
     </Fragment>
    )
  }
}
