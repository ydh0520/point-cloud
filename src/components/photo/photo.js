import React, {Component,useEffect} from 'react';
const async = require("async")
class Photo extends Component {
  
    componentDidUpdate(prevProps,prevState){
      console.log(this.props.binFilesNames)
      console.log(this.props.index)
      console.log(this.props.binFilesNames[this.props.index].substring(0,this.props.binFilesNames[this.props.index].length-4))
      console.log(this.props.photosRelatedToBin)
      console.log(this.props.photosRelatedToBin[this.props.binFilesNames[this.props.index].substring(0,this.props.binFilesNames[this.props.index].length-4)])
    }

    render(){
      return (
        <div id="photo">
        </div>
      )
    }
  }

  

export default Photo