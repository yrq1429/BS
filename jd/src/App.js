import React, { Component } from 'react';
import './App.css';
import Map from './components/map/Map.js'
import MyJd from './components/myJd/MyJd.js'
import JDbuy from './components/jdbuy/JDbuy.js'
import ClientServer from './components/ClientServer/ClientServer.js'
import WebNav from './components/webNav/WebNav.js'
import Search from './components/Search/Search.js'
import ShoppingCar from './components/ShoppingCar/ShoppingCar.js'
import JDMenu from './components/JDMenu/JDMenu.js'
import Swiper from './components/Swiper/Swiper.js'
import UserInner from './components/UserInner/UserInner.js'
import NewsItem from './components/NewsItem/NewsItem.js'
import OtherServer from './components/OtherServer/OtherServer.js'
import CountDown from './components/CountDown/CountDown.js'

import close from "./assets/img/close.png"
import Swiper1 from './components/Swiper1/Swiper1';


class App extends Component {
  state = {
    showBanner: true,
    showIcon: false
  }
  hideBanner () {
    this.setState({
      showBanner: false
    })
  }
  render() {
    const BGImg = [   {"url":"//img1.360buyimg.com/pop/jfs/t1/559/7/2427/119436/5b95cb01Ecee1073e/e1658e6f79b39589.jpg","id":1},{"url":"//m.360buyimg.com/babel/jfs/t1/5397/38/2253/241129/5b96350eEe25efaff/79a2e06a7e753ca7.jpg!q95","id":2},{"url":"//m.360buyimg.com/babel/jfs/t23272/296/2668344979/88334/7ac9e06c/5b88b3deNd6951032.jpg","id":3},{"url":"//m.360buyimg.com/babel/jfs/t1/3070/10/2189/61849/5b9610bfE106326bb/5e64ef25b7636cba.jpg","id":4},{"url":"//img1.360buyimg.com/da/jfs/t24880/13/1188829163/97033/abd959df/5b8e4213N9f654628.jpg","id":5},
    ];
    const smallImg1 = [{"url":"//img30.360buyimg.com/mobilecms/s180x260_jfs/t1/4290/11/646/99083/5b922780Eb66bab39/50ddd70595fc22ae.png!q90!cc_180x260","id":1},{"url":"//img11.360buyimg.com/mobilecms/s180x260_jfs/t1/3072/8/1921/104615/5b951534Eceae09c6/8e7da50fa6a1a7a9.jpg!q90!cc_180x260","id":2},
    ]
    return (
      <div className="App">
        <div className="header-banner" 
          style={{display: this.state.showBanner?"block":"none"}}>
          <div className="banner-img" >
          </div>
          <div className="close" onClick={this.hideBanner.bind(this)}>
            <img src={close} alt=""/>
          </div>
        </div>
        <div className="header-top">
          <div className="header-top_index normal">
            京东首页
          </div>
          <div className="header-top_map">
            <Map />
          </div>
          <div className="header-top_login normal">
              您好，请登录 <a href="#" className="red">免费登录</a>
          </div>
          <div className="header-top_list">
            <ul>
              <li>
                <div className="icon1"></div>
                <div className="header-top_myOrder"> 
                  <a href="#">我的订单</a> 
                </div>
              </li>
              <li>
                <div className="icon1"></div>                
                <div className="header-top_myJd"> 
                  <MyJd />
                </div>
              </li>
              <li>
                <div className="icon1"></div>                  
                <div className="header-top_myOrder"> 
                  <a href="#">京东会员</a> 
                </div>
              </li>
              <li>
                <div className="icon1"></div>                  
                <div className="header-top_myOrder"> 
                  <JDbuy />
                </div>
              </li>
              <li>
                <div className="icon1"></div>                  
                <div className="header-top_Client"> 
                  <ClientServer />
                </div>
              </li>
              <li>
                <div className="icon1"></div>                  
                <div className="header-top_webnav"> 
                  <WebNav />
                </div>
              </li>
              <li>
                <div className="icon1"></div>                  
                <div className="header-top_myOrder"> 
                  <a href="#">手机京东</a> 
                  <div className="mobile"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="logoShow"></div>
            <div className="search">
              <Search width="500px" height="30px"/>
            </div>
            <div className="shoppingCar">
              <ShoppingCar />
            </div>
            <div className="header-nav">
              <ul id="group1">
                <li><a href="#">秒杀</a></li>
                <li><a href="#">优惠券</a></li>
                <li><a href="#">PLUS会员</a></li>
                <li><a href="#">闪购</a></li>
              </ul>
              <ul id="group2">
                <li><a href="#">拍卖</a></li>
                <li><a href="#">京东服饰</a></li>
                <li><a href="#">京东超市</a></li>
                <li><a href="#">生鲜</a></li>
              </ul>
              <ul id="group3">
                <li><a href="#">全球购</a></li>
                <li><a href="#">京东金融</a></li>
              </ul>
            </div>
            <div className="small-banner"></div>
          </div>
          <div className="mainNav">
            <div className="jd-menu">
              <JDMenu />
            </div>
            <div className="swiper1">
              <Swiper 
                delay="2500"
                BGImg={BGImg}
                width="590"
                showIcon="true"
                showDot="big"
              />
            </div>
            <div className="banner-list">
              <div className="banner-item">
                <a href="#">
                  <div className="banner-list_img">
                    <img src="//img14.360buyimg.com/babel/s190x150_jfs/t25420/4/1027852437/51604/43306585/5b879d3cN6a6d4a5e.jpg!q90!cc_190x150" />
                  </div>
                </a>
              </div>
              <div className="banner-item">
                <a href="#">
                  <div className="banner-list_img">
                    <img src="//img14.360buyimg.com/babel/s190x150_jfs/t25624/137/1305592720/36181/56aa1632/5b90eed9N37e71c21.jpg!q90!cc_190x150" />
                  </div>
                </a>
              </div>
              <div className="banner-item">
                <a href="#">
                  <div className="banner-list_img">
                    <img src="//img1.360buyimg.com/pop/s190x150_jfs/t27406/89/344928418/41697/1cbdc47b/5b8f4496N6e43c31b.jpg!q90!cc_190x150" />
                  </div>
                </a>
              </div>
            </div>
            <div className="side-news">
              <div className="user_inner">
                <UserInner />
              </div>
              <div className="news_item">
                <NewsItem />
              </div>
              <div className="otherServer">
                <OtherServer />
              </div>
            </div>
            
          </div>
          <div className="CountDown">
            <div className="timer">
              <CountDown title="京东秒杀" hours="24"/>
            </div>
            <div className="sellGoods">
              <Swiper1 />
            </div>
            <div className="swiperGroup">
              <div className="swiperGroup-item">
              <Swiper 
                delay="2500"
                BGImg={smallImg1}
                width="180"
                showDot="small"
              />
              </div>
              
            </div>
          </div>          
        </div>
        
      </div>
    );
  }
}

export default App;
