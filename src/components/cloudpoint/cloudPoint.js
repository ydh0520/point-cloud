import React, {Component} from 'react';
import ThreeEntryPoint from './threeEntryPoint'
import CloudPointToolbox from './cloudPointToolbox';

class CloudPoint extends Component {
  constructor(props){
    super(props)

    this.state={
      cameraState:0
    }
  }

  chageCamera=()=>{
    if(this.state.cameraState==0){
      this.setState({
        cameraState:1
      })
    }else{
      this.setState({
        cameraState:0
      })
    }
  }

  render(){
    return (
      <div id="cloudpoint">
        <button onClick={this.chageCamera}>카메라 전환</button>
        <ThreeEntryPoint rawData={this.props.binFiles[this.props.index]} cameraState={this.state.cameraState}></ThreeEntryPoint>  
      </div>
    )
  }
}

export default CloudPoint
