import React, { Component } from 'react'
import './login.less'
import logo from './logo.jpg'
export default class Login extends Component {
    render() {
        return (
            <div className="login">
                <header className="login-header" >
                <img src={logo} alt=""/>
                    <h1>刀锋铁骑六扇门包子</h1>
                </header>
                <section className="login-content" ></section>
            </div>
        )
    }
}
