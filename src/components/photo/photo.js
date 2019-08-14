import React, {Component,useEffect} from 'react';
import './photo.css'
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

    zoomImg(event){
      if(event.currentTarget.style.width === "100%"){
        event.currentTarget.style.width = "150px";
      }else{
        event.currentTarget.style.width = "100%";
      }
      
    }
  
    render(){
      var id = 0
      const imgList = this.state.imgPath.map(
        (imgPa) => (<li><img  className="imgFiles" id={id++} src={imgPa} onClick={this.zoomImg}/></li>)
      );
      return (
        <div id="photo">
          <ul>{imgList}</ul>
         </div>
      )
    }
  }

  

export default Photo