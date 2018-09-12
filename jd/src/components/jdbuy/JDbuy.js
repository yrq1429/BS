import React, { Component } from 'react';
import './jdbuy.css';
import down from "../../assets/img/down.png"

class JDbuy extends Component {
  state = {
    showJDbuy: false,
    BuyContent: [
      {"name": "企业购", "id": 1},
      {"name": "商用场景卡", "id": 2},
      {"name": "工业品", "id": 3},
      {"name": "礼品卡", "id": 4},
      
    ]
  }
  showJDbuy () {
    this.setState({
      showJDbuy: true
    })
  }
  hideJDbuy () {
    this.setState({
      showJDbuy: false
    })
  }
  render () {
    return (
      <div className="JDbuy" 
            onMouseOver={this.showJDbuy.bind(this)}
            onMouseOut={this.hideJDbuy.bind(this)}>
        <div 
              className= {this.state.showJDbuy?"JDbuy-header isOver":"JDbuy-header"}>
          <a href="#">企业采购</a>
          <div className="down">
            <img src={down} alt="详情" />
          </div> 
        </div>
        <div  className="JDbuy-content "
              style={{display: this.state.showJDbuy ? "block":"none"}}>
          <div className="item">
            <ul>
              {
                this.state.BuyContent.map(item=>
                <li key={item.id}>
                  <a href="#">{item.name}</a>
                </li>)
              } 
            </ul>
          </div>
          
        </div>
        
      </div>
    )
  }
}

export default JDbuy;