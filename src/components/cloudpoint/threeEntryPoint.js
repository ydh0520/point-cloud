import React, {Component} from 'react'
import * as THREE from "three"
import THREECamera from "./threeCamera"
import THREECloudPoint from "./threeCloudPoint"


const renderer = new THREE.WebGLRenderer({
  alpha:true
})
const camera = THREECamera.create2DCamera(500)
let scene  = new THREE.Scene()

class threeEntryPoint extends Component {
  state={
    cameraState:0,
    camera2d:'',
    camera3d:''
  }

  componentDidMount(){
    const rootDom = document.getElementById("cp-canvas")
    renderer.setSize(500,500)
    rootDom.appendChild(renderer.domElement)
    scene.background=new THREE.Color(0x111111)
  }

  componentWillUpdate(nextProps){
    scene=new THREE.Scene()

    scene.background=new THREE.Color(0x111111)
    scene.add(new THREE.AmbientLight(0x505050,100))

    scene.add(THREECloudPoint.createCloudpoint(nextProps['rawData']))
  }

  render(){
    renderer.render(scene,camera)
    return (
        <div id ="cp-canvas"></div>
    )
  }
}

export default threeEntryPoint