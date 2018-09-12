import React, { Component } from 'react'
import './swiper1.css'
import left from '../../assets/img/left.png'
import right from '../../assets/img/right.png'
class Swiper1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goods:[       {"url":"//img13.360buyimg.com/mobilecms/s140x140_jfs/t20602/280/710978218/336882/78580da6/5b162559N2a2b3679.jpg!q90.webp","title":"希捷(SEAGATE)酷鱼系列 2TB 7200转64M SATA3 台式机机械硬盘(ST2000DM006)","newPrice":369.00,"oldPrice":419.00,"id":1},{"url":"//img13.360buyimg.com/mobilecms/s140x140_jfs/t24877/5/1129057572/185078/489140d/5b8cd2f8N759fd592.jpg!q90.webp","title":"月饼 华美花韵月语中秋月饼礼盒600g","newPrice":39.90,"oldPrice":66.00,"id":2},{"url":"//img11.360buyimg.com/mobilecms/s140x140_jfs/t1/3477/27/2244/191554/5b9613cfEba301e7c/aef5ed6bca7588e4.jpg!q90.webp","title":"小米（MI）米家空气净化器2S家用智能除甲醛雾霾PM2.5检测仪霾表屏显示 小米米家空气净化器2S+除甲醛增强版滤芯","newPrice":849.00,"oldPrice":999.00,"id":3},{"url":"//img30.360buyimg.com/mobilecms/s140x140_jfs/t19576/221/2486287277/327475/e7b32d6f/5af8f33eN75c72c3c.jpg!q90.webp","title":"德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒","newPrice":99.00,"oldPrice":169.00,"id":4},{"url":"//img30.360buyimg.com/mobilecms/s140x140_jfs/t19576/221/2486287277/327475/e7b32d6f/5af8f33eN75c72c3c.jpg!q90.webp","title":"德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒","newPrice":99.00,"oldPrice":169.00,"id":4},{"url":"//img30.360buyimg.com/mobilecms/s140x140_jfs/t19576/221/2486287277/327475/e7b32d6f/5af8f33eN75c72c3c.jpg!q90.webp","title":"德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒","newPrice":99.00,"oldPrice":169.00,"id":4},{"url":"//img30.360buyimg.com/mobilecms/s140x140_jfs/t19576/221/2486287277/327475/e7b32d6f/5af8f33eN75c72c3c.jpg!q90.webp","title":"德国DMK进口牛奶  欧德堡（Oldenburger）超高温处理全脂纯牛奶1L*12盒","newPrice":99.00,"oldPrice":169.00,"id":4}
      ]
    }
  }
  render () {
    return (
      <div className="o-swiper">
        {
            this.state.goods.map (item =>
              <a href="">
                <div className="oSwiper-item" key={item.id}>
                  <div className="item_img">
                    <img src={item.url} alt={item.title} className="img"/>
                  </div>
                  <p className="item_title"> <a href="">{item.title}</a> </p>
                  <div className="item_price">
                    <span className="newPrice">￥{item.newPrice}</span>
                    <span className="oldPrice">￥{item.oldPrice}</span>
                  </div>
                </div>
              </a>
              )
        }
        <div className="o-button-group">
          <div className="o-prev">
            <a>
              <img src={left} />
            </a>
          </div>
          <div className="o-next">
            <a>
              <img src={right} />
            </a>
          </div>
        </div>
      </div>
      
    )
  }
}

export default Swiper1