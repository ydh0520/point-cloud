import React, {Component} from 'react';
import * as THREE from "three"
import THREECamera from "./threeCamera"
import THREECloudPoint from "./threeCloudPoint"


const renderer = new THREE.WebGLRenderer({
  alpha:true
})
const camera = THREECamera.create2DCamera(500)
let scene  = new THREE.Scene();

class threeEntryPoint extends Component {
  state={
  }

  // componentDidMount(){
    
  //   const rootDom = document.getElementById("cp-canvas");

  //   rootDom.appendChild(renderer.domElement)
  //   scene.background=new THREE.Color(0x111111);
  // }

  // componentWillReceiveProps(nextProps,nextState){

  //   if(typeof nextProps['rawData']!=='undefined'){
  //     scene  = new THREE.Scene();

  //     const light = new THREE.AmbientLight(0x505050,100)
  //     scene.add(light)

  //     scene.add(THREECloudPoint.createCloudpoint(nextProps['rawData']))
  //     console.log(camera)
  //     console.log(scene)
  //     console.log(renderer)
  //     renderer.render(scene,camera)

  //   }
  // }

  componentWillUpdate(nextProps, nextState){
    console.log(nextProps)
  }

  componentDidUpdate(prevProps, prevState){
    console.log(prevProps)
  }

  render(){
    return (
        <div id ="cp-canvas"></div>
    )
  }
}

export default threeEntryPoint