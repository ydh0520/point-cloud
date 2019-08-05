import React, {Component} from 'react';
import ThreeEntryPoint from './threeEntryPoint'
import CloudPointToolbox from './cloudPointToolbox';

class CloudPoint extends Component {
  state={

  }

  render(){
    return (
      <div id="cloudpoint">
        <CloudPointToolbox></CloudPointToolbox>
        <ThreeEntryPoint rawData={this.props.binFiles[this.props.index]}></ThreeEntryPoint>  
      </div>
    )
  }
}

export default CloudPoint
