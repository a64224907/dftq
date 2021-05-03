import React, { Component } from 'react'
import { Layout } from 'antd';
import MySlider from '../../components/MySlider'
import './index.less'
import memoryUtils from '../../util/memomyUtils'
import Home from '../Home'
import Role from '../Role'
import Skin from '../Skin'
import User from '../User'
import Weapon from '../Weapon'
import './index.less'
import ajax from '../../api/ajax'
import {dateFormat} from '../../util/dateUtils'
import { Redirect, Route,Switch } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

export default class Admin extends Component {
  state = {
    time : ''
  }
  componentDidMount() {
    setInterval(()=> {
      this.setState({time:dateFormat(new Date())})
    },1000) 
  }
  render() {
    const user = memoryUtils.user
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
              <a href="#">退出</a>
            </div>
            <div className="header-bottom">
              <div className="header-bottom-left">
                <span>首页</span>
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
              <Route path="/Skin" component={Skin} />
              <Route path="/User" component={User} />
              <Route path="/Weapon" component={Weapon} />
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
