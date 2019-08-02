import React, {Component} from 'react';
import ThreeEntryPoint from './threeEntryPoint'

class CloudPoint extends Component {
  state={

  }

  render(){
    return (
      <div id="cloudpoint">
        <div id="tool-box">
        </div>
        <ThreeEntryPoint rawData={this.props.binFiles[this.props.index]}></ThreeEntryPoint>  
      </div>
    )
  }
}

export default CloudPoint
