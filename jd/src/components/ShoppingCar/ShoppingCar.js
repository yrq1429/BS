import React, { Component } from 'react';
import './ShoppingCar.css';
import car from '../../assets/img/car.png'
class ShoppingCar extends Component {
  state = {
    count: 0,
    showCar: false
  }
  showCar () {
    this.setState({
      showCar: true
    })
  }
  hideCar () {
    this.setState({
      showCar: false
    })
  }
  render () {
    return (
      <div className="shoppingCar-content"
        onMouseOver={this.showCar.bind(this)}
        onMouseOut={this.hideCar.bind(this)}
      >
        <div className="shoppingCar-content_header">
          <div className="car">
            <img src={car} alt=""/>
          </div>
          <a href="#">我的购物车</a>  
          <div className="count">
            {this.state.count}
          </div>
        </div>
        <div className="shoppingCar-content_item" 
          style={{display: this.state.showCar?"block":"none"}}>
          <div className="noShopping"></div>
          <span href="#">购物车中还没有商品哦，赶紧选购吧！</span>
        </div>
      </div>
    )
  }
}

export default ShoppingCar;