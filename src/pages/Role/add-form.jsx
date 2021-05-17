import React, { Component,createRef } from 'react'
import { Form, Input, Button, Checkbox,Select } from 'antd';
const {Option} = Select
export default class AddForm extends Component {
  state = {
    
  }
  formNode = createRef()
  componentWillMount() {
    console.log(this.props);
    this.props.setForm(this.formNode)
  }
  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    const {categorys} = this.props
    return (
      <Form
      ref={this.formNode}
      {...layout}
    >

      <Form.Item
        label="角色名称"
        name="roleName"
        rules={[{ required: true, message: '请输入角色名称' }]}
      >
        <Input placeholder="请输入角色名称" />
      </Form.Item>

    </Form>
    )
  }
}
