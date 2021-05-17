import React, { Component, Fragment } from 'react'
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '../../assets/logo.jpg'
import menuList from '../../config/menuConfig.js'
import { NavLink, withRouter } from 'react-router-dom';
const { SubMenu } = Menu
class MySlider extends Component {
  getMenuNodes_map = (menuList) => {
    const path = this.props.location.pathname
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item icon={item.icon} key={item.key}>
            <NavLink to={item.key}>
              {item.title}
            </NavLink>

          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  getMenuNodes = menuList => {
    const path = this.props.location.pathname
    return menuList.reduce((pre,item)=>{
      
      if (!item.children) {
        pre.push (
          (<Menu.Item icon={item.icon} key={item.key}>
            <NavLink to={item.key}>
              {item.title}
            </NavLink>

          </Menu.Item>)
        )
      } else {
        console.log(item);
        // const cItem = item.children.find(item=>path.indexOf(item.key)===0)
        const cItem = item.children.find(cItem=>{
          if(path.indexOf(cItem.key)===0){
            console.log(item.key);
            this.openKey =  item.key
          }
         })
        pre.push (
          (<SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>)
        )
      }
      return pre
    },[])
  }
  componentDidMount() {


  }
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
    console.log(this.menuNodes);
  }
  render() {
    const path = this.props.location.pathname
    const openKey = this.openKey

    return (
      <Fragment>
        <header className="header">
          <img src={logo} alt="" />
        </header>
        <section>
          <Menu
            onClick={this.handleClick}
            style={{ width: 200 }}
            selectedKeys={path}
            defaultOpenKeys={[openKey]}
            mode="inline"
            theme="dark"
          >
            {
              this.menuNodes
            }
            {/* {
          this.getMenuNodes(menuList)
        } */}
            {/* <Menu.Item icon={<HomeOutlined />} key="/home">
        <NavLink to="/home">
          首页
        </NavLink>
          
        </Menu.Item>

        
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="商品">
        <Menu.Item key="/category">
        <NavLink to="/category" >
          品类管理
        </NavLink>
        </Menu.Item>
            <Menu.Item key="/product">
            <NavLink to="/product">
          商品管理
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
        </Menu.Item> */}

          </Menu>
        </section>
      </Fragment>

    )
  }
}
export default withRouter(MySlider)