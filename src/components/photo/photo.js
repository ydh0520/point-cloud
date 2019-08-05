import React, {Component,useEffect} from 'react';
const async = require("async")
class Photo extends Component {
  
     state = {imgPath: []}
    componentWillReceiveProps(nextProps){
      const currentBinName = nextProps.binFilesNames[nextProps.index].split('.')[0]
      const imgFileDic = nextProps.photosRelatedToBin[currentBinName]
      for(var i in imgFileDic){
        this.state.imgPath[i.substring(0,2) * 1] = URL.createObjectURL(imgFileDic[i])
      }
      this.setState(this.state)
    }
  
    render(){
      const imgList = this.state.imgPath.map(
        (imgPa) => (<img src={imgPa}/>)
      );
      return (
        <div id="photo">
          {imgList}
         </div>
      )
    }
  }

  

export default Photo