import React, { Component } from 'react';
import './search.css';
import camera from '../../assets/img/camera.png'
import search from '../../assets/img/search.png'

class Search extends Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div className="search-form">
        <div className="search-input">
          <input type="text" 
          style={{width:this.props.width,height:this.props.height}}
          placeholder="耳机"
          />
        </div>
        <div className="camera">
          <a href="#">
            <img src={camera} alt=""/>            
          </a>
        </div>
        <div className="button" style={{height:this.props.height}}>
          <a href="#">
            <img src={search} alt=""/>            
          </a>
        </div>
        <div className="keyWords">
          <ul>
            <li className="red"><span>超市周年庆</span></li>
            <li><a href="#">国庆出游</a></li>
            <li><a href="#">低至9.9</a></li>
            <li><a href="#">笔记本</a></li>
            <li><a href="#">每160-60</a></li>
            <li><a href="#">金昌鱼</a></li>   
            <li><a href="#">牛奶节</a></li>
            <li><a href="#">烘焙</a></li>
            <li><a href="#">9.9秒杀</a></li>                    
          </ul>
        </div>
      </div>
    )
  }
}

export default Search;
