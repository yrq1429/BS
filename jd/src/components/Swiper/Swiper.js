import React, { Component } from 'react';
import './swiper.css';
import left from '../../assets/img/left.png'
import right from '../../assets/img/right.png'

class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      BGImg:this.props.BGImg,
      showIcon: this.props.showIcon,
      width: this.props.width,
      offset: 0,
      currentImg_id:1,
      timer:setInterval(()=>{
        if (this.state.offset != -(this.props.width)*(this.state.BGImg.length-1)) {
          this.setState({
            offset: this.state.offset - (this.props.width),
            currentImg_id: this.state.currentImg_id + 1
          })
        }else if (this.state.offset === -(this.props.width)*(this.state.BGImg.length-1)) {
        this.setState({
          currentImg_id: 1,
          offset: 0
        })}
      },this.props.delay)
    }
  }
  
  changePrevImg () {
    if (this.state.offset != 0) {
      this.setState({
        offset: this.state.offset + 590,
        currentImg_id: this.state.currentImg_id - 1
      })
    }else if (this.state.offset === 0) {
      this.setState({
        currentImg_id: this.state.BGImg.length,
        offset: (-590)*(this.state.BGImg.length - 1)
      })
    }
  }
  changeNextImg () {
    if (this.state.offset != -2360) {
      this.setState({
        offset: this.state.offset - 590,
        currentImg_id: this.state.currentImg_id + 1
      })
    } else if (this.state.offset === -2360) {
      this.setState({
        currentImg_id: 1,
        offset: 0
      })
    }
    
  }
  getCurrentImg(id) {
    const location = this.state.BGImg.filter(item=>item.id===id);
    return location[0].id;
  }
  changeImgByIcon (id) {
    this.setState({
      currentImg_id: id,
      offset: (id-1)*(-this.props.width)
    })   
  }

  render () {
    return (
      <div className="swiper">
        <ul style={{"marginLeft": this.state.offset+"px","width": (this.state.width)*(this.state.BGImg.length)}}>
          {
            this.state.BGImg.map(item =>
                <li key={item.id} className="img_item" style={{"width": this.state.width}}>  
                  <a href="#">  
                    <img src={item.url} alt=""/>  
                  </a>
                </li>
            )
          }
        </ul>
        <div className="button-group" style={{display:this.state.showIcon?"block":"none"}}>
          <div className="prev" onClick={this.changePrevImg.bind(this)}>
            <a>
              <img src={left} />
            </a>
          </div>
          <div className="next" onClick={this.changeNextImg.bind(this)}>
            <a>
              <img src={right} />
            </a>
          </div>
        </div>
        <div className="icon">
            {
              this.state.BGImg.map(item =>
                <i 
                  className={item.id === this.state.currentImg_id?" icon_item_active":"icon_item"} 
                  // className={this.props.showDot === "small" ?
                  //     (item.id === this.state.currentImg_id)?"icon_item1_active":"icom_item1" 
                  //     :
                  //     (item.id === this.state.currentImg_id)?"icon_item_active":"icom_item"
                  // }
               
                  key={item.id}
                  onMouseOver={this.changeImgByIcon.bind(this, item.id)}
                  ></i>
              )
            }
        </div>
      </div>
    )
  }
}

export default Swiper;