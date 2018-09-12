import React, { Component } from 'react';
import './newsItem.css';

class NewsItem extends Component {
  state = {
    tabActive: 1
  }
  changeTab1 () {
    this.setState({
      tabActive: 1
    })
  }
  changeTab2 () {
    this.setState({
      tabActive: 2
    })
  }
  render () {
    return (
      <div className="news">
        <div className="news-tab">
          <a href="#" className="tab1"
            onMouseOver={this.changeTab1.bind(this)}>促销</a>
          <a href="#" className="tab2" 
            onMouseOver={this.changeTab2.bind(this)}>公告</a>
          <a href="#" className="tab3">更多</a>
          <div className="active" 
            style={{left:this.state.tabActive === 1?"0px":"56px"}}></div>
        </div>
        <div className="news-content">
          {
            this.state.tabActive === 1?
            <div className="news-sell">
              <ul>
                <li>
                  <a href="#">戴尔灵越14轻薄本新品上市</a>
                </li>
                <li>
                  <a href="#">第三届京东相机节</a>
                </li>
                <li>
                  <a href="#">电脑最高直降1000元</a>
                </li>
                <li>
                  <a href="#">奥妙，向伟大的母亲致净</a>
                </li>
              </ul>
            </div>:
            <div className="news-sell">
              <ul>
                <li>
                  <a href="#">京东图书勋章体系改版公告</a>
                </li>
                <li>
                  <a href="#">京东PLUS会员权益更新及会费调整</a>
                </li>
                <li>
                  <a href="#">京东启用全新客服电话“950618”</a>
                </li>
                <li>
                  <a href="#">关于召回普利司通（天津）轮胎有限公司2个规格乘用车轮胎的公告</a>
                </li>
              </ul>
          </div>
          }
        </div>
      </div>
    )
  }
}

export default NewsItem;