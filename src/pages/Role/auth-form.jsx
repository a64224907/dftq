import React, { Component, createRef, Fragment } from 'react'
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig'
const Item = Form.Item
const { TreeNode } = Tree;
export default class AddForm extends Component {
  constructor(props){
    super(props)
    const {menus} = props.role
    this.state = {
      checkedKeys:menus
    }
  }
  getMenus = () => {
    return this.state.checkedKeys
  }
  onChange = value => {
    console.log(value);
    this.setState({ value });
  };
  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push((
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      ))

      return pre
    }, [])
  }
 
  onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  componentWillReceiveProps (nextProps) {
    console.log('componentWillReceiveProps()', nextProps)
    const menus = nextProps.role.menus
    this.setState({
      checkedKeys: menus
    })
    // this.state.checkedKeys = menus
  }
  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
    console.log(this.treeNodes);
  }
  render() {
    const { role } = this.props
    const { menus } = role
    console.log(role);
    return (

      <Fragment>
        <Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          label="角色名称"
        >
          <Input disabled value={role.name} />
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </Fragment>
    )
  }
}
