import React, { Component } from 'react';
import './map.css';
import locationUrl from "../../assets/img/location1.png"
class Map extends Component {
  getLocationName(id) {
    const location = this.state.address.filter(item=>item.id===id);
    // console.log(location)
    return location[0].name;
  }
  showLocationList() {
    this.setState({
      showList: true
    })
  }
  showLocationName (id) {
    this.setState({
      overLocation_id: id
    })
    this.setState({
      showLocationName: true
    })
    
  }
  hideLocationList () {
    this.setState({
      showList: false
    })
  }
  hideLocationName () {
    this.setState({
      showLocationName: false
    })
  }
  componentDidMount() {

  }
  changeLocation (id) {
    this.setState({
      current_id: id
    })
  }
  state = {
    current_id: 1,
    overLocation_id: 0,
    showList: false,
    locationUrl: "../../assets/img/location.png",
    showLocationName: false,
    address: [
      {"name": "北京", "id": 1},
      {"name": "上海", "id": 2},
      {"name": "深圳", "id": 3},
      {"name": "江西", "id": 4},
      {"name": "重庆", "id": 5},
      {"name": "浙江", "id": 6},
      {"name": "江苏", "id": 7},
      {"name": "河北", "id": 8},
      {"name": "湖南", "id": 9},
      {"name": "广西", "id": 10},
      {"name": "北京", "id": 11},
      {"name": "上海", "id": 12},
      {"name": "深圳", "id": 13},
      {"name": "江西", "id": 14},
      {"name": "重庆", "id": 15},
      {"name": "浙江", "id": 16},
      {"name": "江苏", "id": 17},
      {"name": "河北", "id": 18},
      {"name": "湖南", "id": 19},
      {"name": "广西", "id": 20},
      {"name": "北京", "id": 21},
      {"name": "上海", "id": 22},
      {"name": "深圳", "id": 23},
      {"name": "江西", "id": 24},
      {"name": "重庆", "id": 25},
      {"name": "浙江", "id": 26},
      {"name": "江苏", "id": 27},
      {"name": "河北", "id": 28},
      {"name": "湖南", "id": 29},
      {"name": "广西", "id": 30},
      {"name": "北京", "id": 31},
      {"name": "上海", "id": 32},
      {"name": "深圳", "id": 33},
      {"name": "江西", "id": 34},
      {"name": "重庆", "id": 35}
    ]
  }
  // { this.state.showLocationName ? "location overLocation" : "location" }
  render() {
    return (
      <div className="container">
        <div className="head_map" onMouseOver={this.showLocationList.bind(this)} onMouseOut={this.hideLocationList.bind(this)}>
          <div className={this.state.showList?"header-label isOver":"header-label"}>
            <img src={locationUrl} />
            <a href="#">{this.getLocationName(this.state.current_id)}</a>
          </div>
         <div className="list_map" style={{display: this.state.showList? "block" : "none"}}> 
                {
                  this.state.address.map(item=>
                    <div 
                    className={item.id === this.state.current_id?"isSelect location" : item.id === this.state.overLocation_id? "overLocation location" : "location"}  
                    key={item.id} 
                    onMouseOver={this.showLocationName.bind(this, item.id)} onMouseOut={this.hideLocationName.bind(this)}
                    onClick={this.changeLocation.bind(this, item.id)}> {item.name}</div>
                )}
        </div>
        </div>
        
      </div>
      
      
    );
  }
}

export default Map;
