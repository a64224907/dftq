import React, { Component, Fragment } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined,HomeOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.jpg'
import { NavLink,withRouter } from 'react-router-dom';

const { SubMenu } = Menu
 class MySlider extends Component {
  componentDidMount() {
    
  }
  render() {
    const path = this.props.location.pathname
    return (
      <Fragment>
        <header className="header">
          <img src={logo} alt=""/>
        </header>
        <section>
        <Menu
        onClick={this.handleClick}
        style={{ width: 200 }}
        selectedKeys={path}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
      >
        <Menu.Item icon={<HomeOutlined />} key="/home">
        <NavLink to="/home">
          首页
        </NavLink>
          
        </Menu.Item>

        
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商城">
        <Menu.Item key="/weapon">
        <NavLink to="/weapon">
          武器
        </NavLink>
        </Menu.Item>
            <Menu.Item key="/skin">
            <NavLink to="/skin">
          皮肤
        </NavLink>
            </Menu.Item>
        </SubMenu>
        <Menu.Item   icon={<SettingOutlined />} key="/user">
        <NavLink to="/user">
          用户管理
        </NavLink>
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />} key="/role">
        <NavLink to="/role">
          角色管理
        </NavLink>
        </Menu.Item>
      
      </Menu>
        </section>
      </Fragment>

    )
  }
}
export default withRouter(MySlider)