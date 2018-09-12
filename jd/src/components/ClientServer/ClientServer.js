import React, { Component } from 'react';
import './clientserver.css'
import down from "../../assets/img/down.png"

class ClientServer extends Component {
  showClient () {
    this.setState({
      showClient: true
    })
  }
  hideClient () {
    this.setState({
      showClient: false
    })
  }
  state = {
    showClient: false,
    userName: [
      {"userName": "客户", "id": 0},
      {"name": "帮助中心", "id": 1},
      {"name": "售后服务", "id": 2},  
      {"name": "在线客服", "id": 3},
      {"name": "意见建议", "id": 4},   
      {"name": "电话客服", "id": 5},
      {"name": "客服邮箱", "id": 6},   
      {"name": "金融咨询", "id": 7},
      {"name": "全球售客服", "id": 8},   
    ],
    clientName: [
      {"clientName": "用户", "id": 1},
      {"name": "合作招商", "id": 11},
      {"name": "学习中心", "id": 12},  
      {"name": "商家后台", "id": 13},
      {"name": "京麦工作台", "id": 14},   
      {"name": "商家帮助", "id": 15},
      {"name": "规则平台", "id": 16}, 
    ]

  }
  render () {
    return (
      <div className="clientServer"
        onMouseOver={this.showClient.bind(this)}
        onMouseOut={this.hideClient.bind(this)}
      >
        <div 
            className={this.state.showClient?"clientServer-header isOver":"clientServer-header"}>
          <a href="#">客户服务</a> 
          <div className="down">
            <img src={down} alt="详情" />
          </div>
        </div>
        <div className="clientServer-item"
              style={{display: this.state.showClient?"block":"none"}}>
              {
                this.state.userName.map(item=>
                <div className="item-content" key={item.id}>
                  <div className="title">
                    <div  className="username">         
                     {item.userName}
                    </div>
                  </div>
                  <div className="clientContent">
                    <a href="#">{item.name}</a>
                  </div>
                </div>)
              } 
        </div>
        
        
      </div>
    )
  }
}

export default ClientServer;