import React, { Component,createRef } from 'react'
import './login.less'
import { Form, Input, Button,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import storageUtils from '../../util/storageUtils'
import memoryUtils from '../../util/memomyUtils'
import logo from '../../assets/logo.jpg'
import ajax from '../../api/ajax';
import { Redirect } from 'react-router-dom';
export default class Login extends Component {
    formNode = createRef()
    onFinish = async formData => {
      const result  =await ajax('login',formData,'post')
      if(result.status === 1) return message.error(result.msg)
      console.log(result);
      message.success('登录成功')
      console.log(result.data);
      storageUtils.saveUser(result.data)
      memoryUtils.user = result.data
            this.props.history.replace('/')
    }
    render() {
      const user = memoryUtils.user
      console.log('login',user);
      if(user&&user._id) {
        return <Redirect to="/"/>
      }
        return (
            <div className="login">
                <header className="login-header" >
                <img src={logo} alt=""/>
                    <h1>刀锋铁骑六扇门包子</h1>
                </header>
                <section className="login-content" >
                <Form
                ref={c=>this.formNode = c}
      name="normal_login"
      className="login-Data"
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
     

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
         <a href="">注册</a>
      </Form.Item>
    </Form>
                </section>
            </div>
        )
    }
}
