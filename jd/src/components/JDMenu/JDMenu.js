import React, { Component } from 'react';
import './jdmenu.css';

class JDMenu extends Component {
  state = {
    showMainNav: false,
    currentItemList: [],
    contentItem: [
      {"name":["家用电器"],"id":1},
      {"name":["手机","运营商","数码"],"id":2},
      {"name":["电脑","办公"],"id":3},
      {"name":["家居","家具","家装","厨具"],"id":4},  
      {"name":["男装","女装","童装","内衣"],"id":5},     
      {"name":["美妆","个护清洁","宠物"],"id":6},     
      {"name":["女鞋","箱包","钟表","珠宝"],"id":7},     
      {"name":["男鞋","运动","户外"],"id":8},     
      {"name":["房产","汽车","汽车用品"],"id":9},     
      {"name":["母婴","玩具乐器"],"id":10},     
      {"name":["食品","酒类","生鲜","特产"],"id":11},     
      {"name":["艺术","礼品鲜花","农资绿植"],"id":12},     
      {"name":["医药保健","计生情趣"],"id":13},     
      {"name":["图书","音像","电子书"],"id":14},     
      {"name":["机票","酒店","旅游","生活"],"id":15},     
      {"name":["理财","众筹","白条","保险"],"id":16},     
      {"name":["安装","维修","清洗保养"],"id":17}, 
    ],
    itemList:[
      {"Ename":["家电馆","乡村专卖店"],"id":1},
      {"name":["手机","运营商","数码"],"id":2},
      {"name":["电脑","办公"],"id":3},
      {"name":["家居","家具","家装","厨具"],"id":4},  
      {"name":["男装","女装","童装","内衣"],"id":5},     
      {"name":["美妆","个护清洁","宠物"],"id":6},     
      {"name":["女鞋","箱包","钟表","珠宝"],"id":7},     
      {"name":["男鞋","运动","户外"],"id":8},     
      {"name":["房产","汽车","汽车用品"],"id":9},     
      {"name":["母婴","玩具乐器"],"id":10},     
      {"name":["食品","酒类","生鲜","特产"],"id":11},     
      {"name":["艺术","礼品鲜花","农资绿植"],"id":12},     
      {"name":["医药保健","计生情趣"],"id":13},     
      {"name":["图书","音像","电子书"],"id":14},     
      {"name":["机票","酒店","旅游","生活"],"id":15},     
      {"name":["理财","众筹","白条","保险"],"id":16},     
      {"name":["安装","维修","清洗保养"],"id":17}, 
    ],
    showNavLi: false,
    currentLiId: 0
  }
  overLi (id) {
    this.setState({
      currentLiId: id,
      showMainNav: true
    })
  }
  hideNav (id) {
    this.setState({
      currentLiId: 0,
      showMainNav: false
    })
  }
  render () {
    return (
      <div className="container" 
      onMouseOut={this.hideNav.bind(this)}>
        <div className="mainNav-list" >
          <ul>
          {
            this.state.contentItem.map((item,index) => {
              return (
                <li key={index} 
                  className={this.state.currentLiId === item.id?"isSelectLi":""}
                  onMouseOver={this.overLi.bind(this, item.id)}
                  >
                  {
                    item.name.map(function(item1,number){
                      return (
                        <a key={number} href="" id={number}>{item1}&nbsp;&nbsp;</a>
                          );
                    })
                  }
                  </li> 
                    );
                  }
                )
          }
          </ul>
        </div> 
        <div className="mainNav-content" 
          style={{display:this.state.showMainNav?"block":"none"}}
          >
          <div className="show-content">
            <div className="content-header">
            <ul>
              {
                this.state.itemList.map((item,index) => {
                  return (
                    <li key={index}>
                      {
                        item.Ename
                      }
                      </li> 
                        );
                      }
                    )
              }
          </ul>
            </div>
            <div className="content-other"></div>
            
          </div>
          
        </div> 
      </div>
      )
  }
}
export default JDMenu;