import React, { Component } from 'react'
import './webnav.css'
import down from "../../assets/img/down.png"

class WebNav extends Component {
  showWebNav () {
    this.setState({
      showWebNav: true
    })
  }
  hideWebNav () {
    this.setState({
      showWebNav: false
    })
  }
  state = {
    showWebNav: false,
    aa:"123",
    webNavData: 
          {
            "sPname": "特色主题",
            "tv":"行业频道",
            "life":"生活服务",
            "more":"更多精选",
            "item": [
              {"name": "京东试用", "id": 1},
              {"name": "京东金融", "id": 2},
              {"name": "全球售", "id": 3},
              {"name": "国际站", "id": 4},
              {"name": "京东会员", "id": 5},
              {"name": "京东预告", "id": 6},
              {"name": "买什么", "id": 7},
              {"name": "俄语站", "id": 8},
              {"name": "装机大师", "id": 9},
              {"name": "0元测评", "id": 10},
              {"name": "定期送", "id": 11},
              {"name": "港澳售", "id": 12},
              {"name": "优惠券", "id": 13},
              {"name": "秒杀", "id": 14},
              {"name": "闪购", "id": 15},
              {"name": "印尼站", "id": 16},
              {"name": "京东金融科技", "id": 17},
              {"name": "In货推荐", "id": 18},
              {"name": "陪伴计划", "id": 19},
              {"name": "出海招商", "id": 20}
            ],
            "tvItem": [
              {"name": "手机", "id": 11},
              {"name": "智能数码", "id": 12},
              {"name": "玩3C", "id": 13},
              {"name": "电脑办公", "id": 14},
              {"name": "家用电器", "id": 15},
              {"name": "京东智能", "id": 16},
              {"name": "服装城", "id": 17},
              {"name": "京东生鲜", "id": 18},
              {"name": "家装城", "id": 19},
              {"name": "母婴", "id": 20},
              {"name": "食品", "id": 21},
              {"name": "农资频道", "id": 22},
              {"name": "整车", "id": 23},
              {"name": "图书", "id": 24},
              {"name": "京东元器件", "id": 25}
            ],
            "lifeItem":[
              {"name": "京东众筹", "id": 1},
              {"name": "白条", "id": 2},
              {"name": "京东金融", "id": 3},
              {"name": "京东小仓库", "id": 4},
              {"name": "理财", "id": 5},
              {"name": "话费", "id": 6},
              {"name": "水电煤", "id": 7},
              {"name": "彩票", "id": 8},
              {"name": "旅行", "id": 9},
              {"name": "机票酒店", "id": 10},
              {"name": "电影票", "id": 11},
              {"name": "京东到家", "id": 12},
              {"name": "游戏", "id": 13}
            ],
            "moreItem":[
              {"name": "合作招商", "id": 1},
              {"name": "京东通信", "id": 2},
              {"name": "京东E卡", "id": 3},
              {"name": "企业采购", "id": 4},
              {"name": "服务市场", "id": 5},
              {"name": "办公生活馆", "id": 6},
              {"name": "乡村招募", "id": 7},
              {"name": "校园加盟", "id": 8},
              {"name": "京东邦", "id": 9},
              {"name": "京东社区", "id": 10},
              {"name": "游戏社区", "id": 11},
              {"name": "产权维权", "id": 12}
            ]
          }
        
  }
  render () {
    return (
      <div className="webNav"
        onMouseOver={this.showWebNav.bind(this)}
        onMouseOut={this.hideWebNav.bind(this)}
      >
        <div 
          className={this.state.showWebNav?"webNav-header isOver":"webNav-header"}>
          <a href="">网站导航</a>
          <div className="down">
            <img src={down} alt="详情" />
          </div>
        </div>
        <div className="webNav-content"
          style={{display: this.state.showWebNav?"block":"none"}}
        >
          <div className="item1">
            <div className="keyWords">
              {
                this.state.webNavData.sPname
              }
            </div>
              {this.state.webNavData.item.map(item =>
                  <div key={item.id} className="s-item">
                    <a href="#">{item.name}</a>
                  </div>)
              }
          </div>          
          <div className="item1">
            <div className="keyWords">
              {
                this.state.webNavData.tv
              }
            </div>
            {
              this.state.webNavData.tvItem.map(item =>
                <div key={item.id} className="s-item">
                  <a href="#">{item.name}</a>
                </div>
            )}
          </div>
          <div className="item1">
            <div className="keyWords">
              {
                this.state.webNavData.life
              }
            </div>
            {
              this.state.webNavData.lifeItem.map(item =>
                  <div key={item.id} className="s-item">
                    <a href="#">{item.name}</a>
                  </div>)
            }
          </div>
          <div className="item1">
            <div className="keyWords">
              {
                this.state.webNavData.more
              }
            </div>
            {
              this.state.webNavData.moreItem.map(item =>
                  <div key={item.id} className="s-item">
                    <a href="#">{item.name}</a>
                  </div>)
            }
          </div>
        </div>
      </div>
    )
  }
}

export default WebNav;