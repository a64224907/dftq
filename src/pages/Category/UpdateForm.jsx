import React, { Component,createRef } from 'react'
import { Form, Input } from 'antd';
export default class Update extends Component {
  formNode = createRef()
  componentWillMount() {
    console.log(this.props);
    this.props.setForm(this.formNode)
  }
  componentDidMount() {
    let categoryName = this.props.categoryName
    this.formNode.current.setFieldsValue({categoryName})
  }
  componentDidUpdate() {
    let categoryName = this.props.categoryName
    this.formNode.current.setFieldsValue({categoryName})
  }
  render() {
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };
    return (
      <Form
      ref={this.formNode}
      {...layout}
    >

      <Form.Item
        label="分类名称"
        name="categoryName"
        rules={[{ required: true, message: '请输入分类名称' }]}
      >
        <Input placeholder="请输入分类名称"  />
      </Form.Item>

    </Form>
    )
  }
}
