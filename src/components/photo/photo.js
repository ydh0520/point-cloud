import React, {Component,useEffect} from 'react';

class Photo extends Component {
  state = {
    files : null,
    timestampInfoFiles:[],
    photos: {}
  }

  extractTimestampInfoFilesFromfiles(){
    for (var i in this.state.files){
      if(this.state.files[i].type == "application/vnd.ms-excel"){
        this.state.timestampInfoFiles.push(this.state.files[i])
      }
    }
    console.log(this.state.timestampInfoFiles)
  }

  componentDidMount(){

    const photoDir = document.getElementById("photoDir");

    photoDir.addEventListener('change',(e)=>{
      this.setState({files: photoDir.files}); 
      this.extractTimestampInfoFilesFromfiles()
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