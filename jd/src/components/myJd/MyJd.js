import React, { Component } from 'react';
import './myjd.css';
import down from "../../assets/img/down.png"
class MyJd extends Component {
  showMyJD() {
    this.setState({
      showMyJD: true
    })
  }
  hideMyJD () {
    this.setState({
      showMyJD: false
    })
  }
  state = {
    showMyJD: false,
    business: [
      {"name": "待处理事物", "id":1, "href": "www.baidu.com"},
      {"name": "消息", "id":2, "href": "www.baidu.com"},
      {"name": "返修退换货", "id":3, "href": "www.baidu.com"},
      {"name": "我的问答", "id":4, "href": "www.baidu.com"},
      {"name": "降价商品", "id":5, "href": "www.baidu.com"},  
      {"name": "我的关注", "id":6, "href": "www.baidu.com"}
    ],
    aboutMe: [
      {"name": "我的京东", "id":1, "href": "www.baidu.com"},
      {"name": "我的优惠券", "id":2, "href": "www.baidu.com"},
      {"name": "我的白条", "id":3, "href": "www.baidu.com"},
      {"name": "我的理财", "id":4, "href": "www.baidu.com"}
    ]
  }
  render() {
    return (
      <div className="myjd"
        onMouseOver={this.showMyJD.bind(this)} 
        onMouseOut={this.hideMyJD.bind(this)}
      >
        <div className={this.state.showMyJD?"myjd-label isSelectMyJD" : "myjd-label"} >
          <a href="#">我的京东
            <div className="down">
              <img src={down} alt="" />
            </div>  
          </a>
        </div>
        <div className="myjd-content" 
            style={{display: this.state.showMyJD? "block" : "none"}}  
            >
          <div className="myjd-content_business">
              <div className="business" > 
                <ul>
                  {this.state.business.map(item=>
                      <li key={item.id}>
                        <a href="#">{item.name}</a>
                      </li>)
                  } 
                </ul>
              </div>
          </div>
          <div className="myjd-content_aboutMe">
              <div className="business" > 
                <ul>
                  {this.state.aboutMe.map(item=>
                    <li key={item.id}>
                      <a href="#">{item.name}</a>
                        </li>)
                  } 
                </ul>
              </div>
          </div>
        </div>
      </div>
      
    )
  }
}

export default MyJd;
  
// 213136.com