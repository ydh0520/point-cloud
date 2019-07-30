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
    currentIndexOfBin:0
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

        console.log(this.state)
  }

  componentDidMount(){

    const dir = document.getElementById("directory");

    dir.addEventListener('change',(e)=>{
      this.setState({files: dir.files}); 
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
      if(this.state.currentIndexOfBin == this.state.binFiles.length){
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
        <Photo index = {this.state.currentIndexOfBin} binFilesNames = {this.state.binFilesNames}/>
        
      </div>
    )
  }
}
