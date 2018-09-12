import React, { Component } from 'react'
import './countDown.css'

class CountDown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hours: this.props.hours,
      minute: this.props.minute || 0,
      second: this.props.second || 0,   
      timer:setInterval(()=>{
        if (this.state.second === 0) {
          if (this.state.minute === 0) {
            this.setState({
              hours: this.state.hours - 1,
              minute: 59,
            })
          } else if (this.state.minute != 0) {
            this.setState({
              minute: this.state.minute - 1
            })
          }
          this.setState({
            second: 59,
          })
        } else if (this.state.second != 0) {
          this.setState({
            second: this.state.second - 1
          })
        }
      }, 1000)   
    }
    
  }
  render () {
    return (
      <div className="countTime">
        <div className="ct-title">{this.props.title}</div>
        <div className="eng-title">FLASH DEALS</div>
        <i className="icon-title"></i>
        <div className="ct-desc">本场距离结束还剩</div>
        <div className="ct-cd">
          <div className="cd-item cd-hour">
            <span className="cd-txt">{this.state.hours}</span>
          </div>
          <div className="cd-item cd-minute">
            <span className="cd-txt">{this.state.minute}</span>
          </div>
          <div className="cd-item cd-second">
            <span className="cd-txt">{this.state.second}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default CountDown;