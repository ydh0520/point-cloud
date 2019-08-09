import React, {Component} from 'react';
import * as THREE from "three"
import THREECamera from "./threeCamera"
import THREECloudPoint from "./threeCloudPoint"

let scene  = new THREE.Scene()
class CloudPoint extends Component {
  constructor(props){
    super(props)

    const renderer = new THREE.WebGLRenderer({
      alpha:true
    })
    const camera = []
    camera.push(THREECamera.create2DCamera(500))
    camera.push(THREECamera.create3DCamera())

    this.state={
      renderer:renderer,
      camera:camera,
      cameraState:0
    }
  }

  componentDidMount(){
    const rootDom = document.getElementById("cp-canvas")

    let size = window.innerHeight;
    if(window.innerWidth<size){
      size=window.innerWidth;
    }
    size =500;
    this.state.renderer.setSize(size,size) 
    rootDom.appendChild(this.state.renderer.domElement)
    scene.background=new THREE.Color(0x111111)
    
    window.addEventListener('resize',this.handleResize)
    
    this.state.renderer.domElement.addEventListener('mousedown',this.handleMousedown)
    this.state.renderer.domElement.addEventListener('mouseup',this.handleMouseup)
    this.state.renderer.domElement.addEventListener('mousewheel',this.handleMousewheel)
    
    this.state.renderer.render(scene,this.state.camera[this.state.cameraState]) 
  }

  componentWillUpdate(nextProps,nextState){
    scene=new THREE.Scene()

    scene.background=new THREE.Color(0x111111)
    scene.add(new THREE.AmbientLight(0x505050,100))

    scene.add(THREECloudPoint.createCloudpoint(nextProps['binFiles'][nextProps['index']]))
  }
  
  render(){
    this.state.renderer.render(scene, this.state.camera[this.state.cameraState])
    return (
      <div id="cloudpoint">
        <button onClick={this.chageCamera}>카메라 전환</button>
        <div id ="cp-canvas"></div>
      </div>
    )
  }

  //toolbox
  chageCamera=()=>{
    if(this.state.cameraState==0){
      this.state.cameraState=1
    }else{
      this.state.cameraState=0
    }
    this.setState(this.state)
  }
  
  //event handler
  handleResize=(e)=>{
    let size = window.innerHeight;
    if(window.innerWidth<size){
      size=window.innerWidth;
    }
    
    size =500;
    this.state.renderer.setSize(size,size)
    this.state.renderer.render(scene,this.state.camera[this.state.cameraState]) 
  }

  handleMousewheel=(e)=>{
    if(this.state.cameraState===0){
      this.state.camera[0].zoom+=(e.wheelDelta*0.001)

      if(this.state.camera[0].zoom<0.5){
        this.state.camera[0].zoom=0.5
      }else if(this.state.camera[0].zoom>3){
        this.state.camera[0].zoom=3
      }

      this.state.camera[0].updateProjectionMatrix()
    }else if(this.state.cameraState===1){
      this.state.camera[1].position.z-=e.wheelDelta*0.01
      if(this.state.camera[1].position.z==10){
        this.state.camera[1].position.z=10
      }
    }
    this.setState(this.state)
  }

  handleMouseup=(e)=>{
    if(this.state.cameraState===0){

    }else if(this.state.cameraState===1){
      this.state.renderer.domElement.removeEventListener('mousemove',this.handleMousemove3D)
    }
  }

  handleMousedown=(e)=>{
    if(this.state.cameraState===0){

    }else if(this.state.cameraState===1){
      this.state.renderer.domElement.addEventListener('mousemove',this.handleMousemove3D)
    }
  }

  
  handleMousemove3D=(e)=>{
    scene.rotation.z+=e.movementX*0.01
    scene.rotation.x+=e.movementY*0.01

    this.state.renderer.render(scene,this.state.camera[this.state.cameraState])
  }
  
  handleCreate=(e)=>{
    scene.rotation.z+=e.movementX*0.01
    scene.rotation.x+=e.movementY*0.01

    this.state.renderer.render(scene,this.state.camera[this.state.cameraState])
  }
}

export default CloudPoint
