import React, { Component } from 'react'
import { Layout,Modal } from 'antd';
import MySlider from '../../components/MySlider'
import './index.less'
import memoryUtils from '../../util/memomyUtils'
import storageUtils  from '../../util/storageUtils.js'
import Home from '../Home'
import Role from '../Role'
import Product from '../Product/product'
import User from '../User'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'



import Category from '../Category'
import LinkButton from '../../components/LinkButton'
import './index.less'
import menuList from '../../config/menuConfig'
import { Redirect, Route,Switch } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  state = {
    time : '',
    title:''
  }
  logout = () => {
    Modal.confirm({
      content:'确定退出吗',
      onOk:() =>{
        storageUtils.removeUser()
        memoryUtils.user = {}
        this.props.history.replace('/login')
      }
    })
  }
  getTitle = () => {
    const path = this.props.location.pathname
    menuList.forEach(item=>{
      console.log(item.key,path);
      if(item.key === path){
      if(this.state.title === item.title) return
        
        this.setState({
          title:item.title
        })
      }else if(item.children) {
        console.log(item);
        const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
        if(cItem){
      if(this.state.title === cItem.title) return
          this.setState({
            title:cItem.title
          })
        }
      }
    })
  }
  componentWillUnmount () {
    // clearInterval(this.timer)
  }
  // getTime = () => {
  //   this.timer =  setInterval(()=> {
  //     console.log(new Date());
  //      this.setState({time:dateFormat(new Date())})
  //    },1000) 
  // }
  componentWillMount() {
  this.getTitle();

  }
  componentDidMount() {
  //  this.getTime()

  }
  componentDidUpdate() {
    this.getTitle()
  }
  render() {
    const user = memoryUtils.user
    const {title} = this.state
    console.log(title);
    if(!user ||!user._id) {
      return <Redirect to="/login"/>
    }
    const {time } = this.state
    return (
      <Layout>
        <Sider>
          <MySlider />
        </Sider>
        <Layout>
          <Header >
            <div className="header-top">
    <span>欢迎您！ {user.user} 六扇门包子  </span>
              <LinkButton onClick={this.logout}>退出</LinkButton>
            </div>
            <div className="header-bottom">
              <div className="header-bottom-left">
                <span>{title}</span>
              </div>
              <div className="header-bottom-right">
    <span>{time}</span>
              </div>
            </div>
          </Header>
          <Content>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/Role" component={Role} />
              <Route path="/Product" component={Product} />
              <Route path="/User" component={User} />
              <Route path="/category" component={Category} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer style={{textAlign:'center',borderTop:'1px solid #000'}}>
           <h1>刀锋铁骑永不灭！！！</h1>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
