import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import CloudPoint from "./components/cloudpoint/cloudPoint"
import Photo from "./components/photo/photo"



export default class App extends Component{

    state = {
    files : null,
    timestampInfo:{},
    imgFiles:{},
    binFiles:[],
    binFilesNames:[],
    photosRelatedToBin: {},
    currentIndexOfBin:0
    }

    stateInitialize(){
      this.state = {
        files : null,
        timestampInfo:{},
        imgFiles:{},
        binFiles:[],
        binFilesNames:[],
        photosRelatedToBin: {},
        currentIndexOfBin:0
        }
    }

   readFile(file){
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      }

      reader.onerror = reject;

      reader.readAsText(file)
    })
  }

  readBinFile(file){
    return new Promise((resolve, reject) => {
      let binReader = new FileReader();

      binReader.onload = () => {
        resolve(binReader.result);
      }

      binReader.onerror = reject;

      binReader.readAsArrayBuffer(file)
      
    })
  }

  findImgsByTimeStamp(timestampOfBi,binName){
    for (var key in this.state.timestampInfo){
     if(key.includes('cameras')){

         var imgName = "";
         var differenceBetweenTimestamps = Infinity;

         for(var i = 2; i < this.state.timestampInfo[key].length; i+= 2){
           const diffTemp = Math.abs(this.state.timestampInfo[key][i] - timestampOfBi)
           if(diffTemp <= differenceBetweenTimestamps){
             differenceBetweenTimestamps = diffTemp;
             imgName = this.state.timestampInfo[key][i + 1]
           }else{
             break;
           }
         }
         this.state.photosRelatedToBin[binName][key.substring(7,9) +"/"+ imgName] = null;
         };
   }
 }

 findImgNameRelatedToBin(){
   for(var i = 2; i < this.state.timestampInfo['OUSTER0.csv'].length; i+=2){
     this.state.photosRelatedToBin[this.state.timestampInfo['OUSTER0.csv'][i+1]] = {};
     this.findImgsByTimeStamp(this.state.timestampInfo['OUSTER0.csv'][i],this.state.timestampInfo['OUSTER0.csv'][i+1])
   }
 }

 imgFilesToPhotosRelatedToBin(){
   for (var binfileName in this.state.photosRelatedToBin){
     for(var nameOfImg in this.state.photosRelatedToBin[binfileName]){
       const folderName = nameOfImg.split('/')[0]
       const imgName = nameOfImg.split('/')[1]
       for (var i in this.state.imgFiles[folderName]){
         if(this.state.imgFiles[folderName][i].name == imgName+".png"){
           this.state.photosRelatedToBin[binfileName][nameOfImg] = this.state.imgFiles[folderName][i];
           break;
         }
       }
     }
   }

 }

  async readFileController(){
    for (var i in this.state.files){
          if(this.state.files[i].type == "application/vnd.ms-excel"){
            try{
              this.state.timestampInfo[this.state.files[i].name] = (await this.readFile(this.state.files[i])).split(/\n|,/)
            } catch(err) {
              console.log(err)
            }
    
          }else if(this.state.files[i].type == "image/png"){
    
            if(this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]] != undefined){
              this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]].push(this.state.files[i]);
            }else{
              this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]] =[];
              this.state.imgFiles[this.state.files[i].webkitRelativePath.split('/')[1]].push(this.state.files[i]);
            }
    
          }else if(this.state.files[i].type == "application/octet-stream"){
              this.state.binFilesNames.push(this.state.files[i].name)
              this.state.binFiles.push(new Float32Array(await this.readBinFile(this.state.files[i])))
          }
        }

        this.findImgNameRelatedToBin();
        this.imgFilesToPhotosRelatedToBin();
        this.setState(this.state)
  }

  componentDidMount(){

    const dir = document.getElementById("directory");

    dir.addEventListener('change',(e)=>{
      this.stateInitialize()
      this.state.files = dir.files
      this.readFileController();
      
    })

    document.getElementById("Previous").addEventListener('click',(e) => {
      if(this.state.currentIndexOfBin <= 0){
        alert('첫번째 입니다')
      }else{
        this.setState(
          ({currentIndexOfBin}) => ({
            currentIndexOfBin: currentIndexOfBin - 1
          })
        );
      }
    })

    document.getElementById("Next").addEventListener('click',(e) => {
      if(this.state.currentIndexOfBin == this.state.binFiles.length-1){
        alert('마지막 입니다')
      }else{
        this.setState(
          ({currentIndexOfBin}) => ({
            currentIndexOfBin: currentIndexOfBin + 1
          })
        );
      }
    })

  }

   render(){
    return (
      <div id="main">
        <input type="file" id="directory" webkitdirectory="true"/>
        <button id="Previous">Previous</button>
        <button id="Next">Next</button>
        <CloudPoint binFiles = {this.state.binFiles} index = {this.state.currentIndexOfBin}/>
        <Photo index = {this.state.currentIndexOfBin} binFilesNames = {this.state.binFilesNames} photosRelatedToBin={this.state.photosRelatedToBin} />
      </div>
    )
  }
}
