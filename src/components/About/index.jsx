import React, { Component } from 'react'

export default class About extends Component {
    changeHomeCount = e => {
        this.props.changeCount(e.target.value)
    }
    render() {
        return (
            <div>
                <input type="text" onChange={this.changeHomeCount}/>
            </div>
        )
    }
}
