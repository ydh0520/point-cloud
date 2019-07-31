import React, {Component,useEffect} from 'react';
import { resolve } from 'dns';
import { reject, delay } from 'q';

class Photo extends Component {
  // state = {
  //   files : null,
  //   timestampInfo:{},
  //   imgFiles:{},
  //   photosRelatedToBin: {}
  // }

 

  // findImgsByTimeStamp(timestampOfBi,binName){
  //    for (var key in this.state.timestampInfo){
  //     if(key.includes('cameras')){

  //         var imgName = "";
  //         var differenceBetweenTimestamps = Infinity;

  //         for(var i = 2; i < this.state.timestampInfo[key].length; i+= 2){
  //           const diffTemp = Math.abs(this.state.timestampInfo[key][i] - timestampOfBi)
  //           if(diffTemp <= differenceBetweenTimestamps){
  //             differenceBetweenTimestamps = diffTemp;
  //             imgName = this.state.timestampInfo[key][i + 1]
  //           }else{
  //             break;
  //           }
  //         }
  //         this.state.photosRelatedToBin[binName][key.substring(7,9) +"/"+ imgName] = null;
  //         };
  //   }
  // }

  // findImgNameRelatedToBin(){
  //   for(var i = 2; i < this.state.timestampInfo['OUSTER0.csv'].length; i+=2){
  //     this.state.photosRelatedToBin[this.state.timestampInfo['OUSTER0.csv'][i+1]] = {};
  //     this.findImgsByTimeStamp(this.state.timestampInfo['OUSTER0.csv'][i],this.state.timestampInfo['OUSTER0.csv'][i+1])
  //   }
  // }

  // imgFilesToPhotosRelatedToBin(){
  //   for (var binfileName in this.state.photosRelatedToBin){
  //     for(var nameOfImg in this.state.photosRelatedToBin[binfileName]){
  //       const folderName = nameOfImg.split('/')[0]
  //       const imgName = nameOfImg.split('/')[1]
  //       for (var i in this.state.imgFiles[folderName]){
  //         if(this.state.imgFiles[folderName][i].name == imgName+".png"){
  //           this.state.photosRelatedToBin[binfileName][nameOfImg] = this.state.imgFiles[folderName][i];
  //           break;
  //         }
  //       }
  //     }
  //   }

  // }

  // async controller(){

  //   for (var i in this.state.files){
  //     if(this.state.files[i].type == "application/vnd.ms-excel"){

  //       try{
  //         this.state.timestampInfo[this.state.files[i].name] = (await this.readFile(this.state.files[i])).split(/\n|,/)
  //       } catch(err) {
  //         console.log(err)
  //       }

  //     }else if(this.state.files[i].type == "image/png"){

  //       if(this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]] != undefined){
  //         this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]].push(this.state.files[i]);
  //       }else{
  //         this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]] =[];
  //         this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]].push(this.state.files[i]);
  //       }

  //     }
  //   }

  //   this.findImgNameRelatedToBin();
  //   this.imgFilesToPhotosRelatedToBin();
  //   console.log(this.state.photosRelatedToBin)
  // }

  // componentDidMount(){

  //   const photoDir = document.getElementById("photoDir");

  //   photoDir.addEventListener('change',(e)=>{
  //     this.setState({files: photoDir.files}); 
  //     this.controller();
      
  //   })

  // }
  componentWillUpdate(nextProps, nextState){
    console.log(nextProps)
  }

  render(){
    return (
      <div id="photo">
      </div>
    )
  }
}

export default Photo