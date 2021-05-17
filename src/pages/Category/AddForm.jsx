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
  CategoryrChange = () => {

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
        label="所属分类"
        name="parentId"
        rules={[{ required: true, message: '请选择所属分类' }]}
      >
        <Select >
          {
            categorys.map(item=>{
              return <Option key={item.id} value={item._id}>{item.name}</Option>
            })
          }
        </Select>
      </Form.Item>

      <Form.Item
        label="分类名称"
        name="categoryName"
        rules={[{ required: true, message: '请输入分类名称' }]}
      >
        <Input placeholder="请输入分类名称" />
      </Form.Item>

    </Form>
    )
  }
}
