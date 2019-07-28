import React, {Component,useEffect} from 'react';

class Photo extends Component {
  state = {
    files : null,
    timestampInfoFiles:{},
    photosRelatedToBin: {}
  }

  extractTimestampInfoFilesFromfiles(){
    for (var i in this.state.files){
      if(this.state.files[i].type == "application/vnd.ms-excel"){
        this.state.timestampInfoFiles[this.state.files[i].name] = this.state.files[i];
      }
    }
  }

  saveww(){
    console.log("dsfdsfds")
  }

  findImgsByTimeStamp(timestampOfBi,binName){
     for (var key in this.state.timestampInfoFiles){
      if(key.includes('cameras')){
        const timestampOfImgReader = new FileReader();

        timestampOfImgReader.onload = (function(theFile,photosRelatedToBinTemp){
          var fileName = theFile.name;
          return function(e){
          const timestampsOfImg = e.target.result.split(/\n|,/);
          var imgName = "";
          var differenceBetweenTimestamps = Infinity;

          for(var i = 2; i < timestampsOfImg.length; i+= 2){
            const diffTemp = Math.abs(timestampsOfImg[i] - timestampOfBi)
            if(diffTemp <= differenceBetweenTimestamps){
              differenceBetweenTimestamps = diffTemp;
              imgName = timestampsOfImg[i + 1]
            }else{
              break;
            }
          }
          photosRelatedToBinTemp[binName][fileName.substring(7,9) +"/"+ imgName + imgName] = null;
          };
      })(this.state.timestampInfoFiles[key],this.state.photosRelatedToBin); 
        
        timestampOfImgReader.readAsText(this.state.timestampInfoFiles[key])
      }
    }
  }

  findImgNameRelatedToBin(){
    const timestampOfBinReader = new FileReader();
    timestampOfBinReader.onload = (e) =>{
      const timestampOfBins = e.target.result.split(/\n|,/);
      
      for(var i = 2; i < timestampOfBins.length; i+=2){
        this.state.photosRelatedToBin[timestampOfBins[i+1]] = {};
        this.findImgsByTimeStamp(timestampOfBins[i],timestampOfBins[i+1])
      }
    }
    timestampOfBinReader.readAsText(this.state.timestampInfoFiles["OUSTER0.csv"])
  }

  componentDidMount(){

    const photoDir = document.getElementById("photoDir");

    photoDir.addEventListener('change',(e)=>{
      this.setState({files: photoDir.files}); 
      this.extractTimestampInfoFilesFromfiles();
      this.findImgNameRelatedToBin();
      console.log(this.state.photosRelatedToBin)
    })

  }

  render(){
    return (
      <div id="photo">
          <input type="file" id="photoDir" webkitdirectory="true"/>
      </div>
    )
  }
}

export default Photo