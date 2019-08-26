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

      var listObj = document.getElementById("imgUl").children
      for(var i = 0; i < listObj.length; i++){
        
        listObj[i].children[0].style.width = "150px";
    }

        event.currentTarget.style.width = "100%";
      this.props.setCurrentIndexOfCamera(event.currentTarget.id)
    }

    constructor(props) {
      super(props);
      this.zoomImg= this.zoomImg.bind(this);
  }
  
    render(){
      var id = 0
      const imgList = this.state.imgPath.map(
        (imgPa) => (<li><img  className="imgFiles" id={id++} src={imgPa} onClick={this.zoomImg}/></li>)
      );
      return (
        <div id="photo">
          <ul id="imgUl">{imgList}</ul>
         </div>
      )
    }
  }

  

export default Photo