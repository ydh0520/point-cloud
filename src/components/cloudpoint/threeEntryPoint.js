import React, {Component} from 'react'
import * as THREE from "three"
import THREECamera from "./threeCamera"
import THREECloudPoint from "./threeCloudPoint"

let scene  = new THREE.Scene()

class threeEntryPoint extends Component {

  constructor(props){
    super(props);

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

    this.state.renderer.setSize(size,size) 
    rootDom.appendChild(this.state.renderer.domElement)
    scene.background=new THREE.Color(0x111111)
    
    this.state.renderer.render(scene,this.state.camera[this.state.cameraState]) 

    window.addEventListener('resize',this.handleResize)
    this.state.renderer.domElement.addEventListener('mousedown',this.handleMousedown)
    this.state.renderer.domElement.addEventListener('mouseup',this.handleMouseup)
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      cameraState:nextProps.cameraState
    })
  }

  shouldComponentUpdate(nextProps,nextState){
    return true
  }

  componentWillUpdate(nextProps,nextState){
    scene=new THREE.Scene()

    scene.background=new THREE.Color(0x111111)
    scene.add(new THREE.AmbientLight(0x505050,100))

    scene.add(THREECloudPoint.createCloudpoint(nextProps['rawData']))
  }

  componentDidUpdate(prevProps, prevState){

  }

  render(){
    this.state.renderer.render(scene,this.state.camera[this.state.cameraState])
    return (
        <div id ="cp-canvas"></div>
    )
  }

  handleResize=(e)=>{
    let size = window.innerHeight;
    if(window.innerWidth<size){
      size=window.innerWidth;
    }
    this.state.renderer.setSize(size,size)
    this.state.renderer.render(scene,this.state.camera[this.state.cameraState]) 
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

export default threeEntryPoint