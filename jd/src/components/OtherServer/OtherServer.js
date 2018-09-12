import React, { Component } from 'react';
import './otherServer.css';
import hotel from '../../assets/img/hotel.png'
import huafei from '../../assets/img/huafei.png'
import air from '../../assets/img/air.png'
import game from '../../assets/img/game.png'
import JDBuy from '../../assets/img/JDBuy.png'
import oil from '../../assets/img/oil.png'
import touyy from '../../assets/img/touyy.png'
import train from '../../assets/img/train.png'
import zhongchou from '../../assets/img/zhongchou.png'
import money from '../../assets/img/money.png'
import gift from '../../assets/img/gift.png'
import baitiao from '../../assets/img/baitiao.png'

class OtherServer extends Component {
  state = {
    showImg: true,
    mainItem:[
      {"name":"话费","id":"1","url":huafei},
      {"name":"机票","id":"2","url":air},
      {"name":"酒店","id":"3","url":hotel},
      {"name":"游戏","id":"4","url":game}      
    ],
    otherItem: [
      {"name":"企业购","id":"5","url":JDBuy},
      {"name":"加油卡","id":"6","url":oil},
      {"name":"电影票","id":"7","url":touyy},
      {"name":"火车票","id":"8","url":train},
      {"name":"众筹","id":"9","url":zhongchou},
      {"name":"理财","id":"10","url":money},
      {"name":"礼品卡","id":"11","url":gift},
      {"name":"白条","id":"12","url":baitiao}  
    ]
  }
  hideImg () {
    this.setState({
      showImg: true
    })
  }
  render () {
    return (
      <div className="otherServer-inner">
        <div className="otherServer-label">
          <ul>
            {
              this.state.mainItem.map(item => 
                <li key={item.id} className="server-item"
                    onMouseOver={this.hideImg.bind(this)}>
                  <div className="img"
                    style={{display:this.state.showImg?"block":"none"}}>
                    <img src={item.url} alt=""/>
                  </div>
                  <a href="">{item.name}</a></li>
              )
            }
            {
              this.state.otherItem.map(item => 
                <li key={item.id} className="server-item"
                    style={{display:this.state.showImg?"block":"none"}}>
                  <div className="img">
                    <img src={item.url} alt=""/>
                  </div>
                  <a href="">{item.name}</a></li>
              )
            }
          </ul>
        </div>
        <div className="otherServer-content">
          <div className="huafei-tab" 
              style={{display:this.state.showImg?"none":"block"}}>
            <ul>
              <li><a href="">话费充值</a></li>
              <li><a href="">流量充值</a></li>
              <li><a href="">套餐变更</a></li>
            </ul>
          </div>
        </div>
      </div>
      
    )
  }
}

export default OtherServer;