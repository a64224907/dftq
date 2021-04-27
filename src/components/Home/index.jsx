import React, { Component } from 'react'
import About from '../About'
export default class Home extends Component {
    state = {
        count: 0
    }
    setCount = number =>  {
        this.setState({count:number})
    }
    render() {
        return (
            <div>
                Home:{this.state.count}
                <About changeCount={this.setCount} />
            </div>
        )
    }
}
