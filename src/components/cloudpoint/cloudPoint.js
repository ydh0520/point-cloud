import React, {Component} from 'react';
import * as THREE from "three"
import THREECamera from "./threeCamera"
import THREECloudPoint from "./threeCloudPoint"
import THREECube from './threeCube'
class CloudPoint extends Component {
  constructor(props){
    super(props)

    const renderer = new THREE.WebGLRenderer({
      alpha:true
    })
    const camera = []
    camera.push(THREECamera.create2DCamera(500))
    camera.push(THREECamera.create3DCamera())

    const scene = []
    scene.push(new THREECloudPoint.createCloudpoint([]))

    this.state={
      renderer:renderer,
      camera:camera,
      cameraState:0,
      scene:scene,
      obj:[],
      mouse:{
        x:0,
        y:0
      }
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

    window.addEventListener('resize',this.handleResize)
    
    this.state.renderer.domElement.addEventListener('mousedown',this.handleMousedown)
    this.state.renderer.domElement.addEventListener('mouseup',this.handleMouseup)
    this.state.renderer.domElement.addEventListener('mousewheel',this.handleMousewheel)
    
    this.state.renderer.render(this.state.scene[this.props.index],this.state.camera[this.state.cameraState]) 
  }

  componentWillUpdate(nextProps,nextState){
    if(nextProps.dir!==this.props.dir){
      const scene=[]
      const obj=[]

      for(let item in nextProps.binFiles){
        const temp = new THREE.Scene()

        temp.background=new THREE.Color(0x111111)
        temp.add(new THREE.AmbientLight(0x505050,100))
        temp.add(THREECloudPoint.createCloudpoint(nextProps.binFiles[item]))

        scene.push(temp)
        obj.push([])
      }

      this.state.scene=scene
      this.state.obj=obj

      this.setState(this.state)
    }

    if(this.props.index!==nextProps.index){
      this.state.scene[nextProps.index].rotation.z+=this.state.scene[this.props.index].rotation.z
      this.state.scene[nextProps.index].rotation.x+=this.state.scene[this.props.index].rotation.x
      
      this.state.scene[this.props.index].rotation.z=0
      this.state.scene[this.props.index].rotation.x=0
  
      this.setState(this.state)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.dir===''){
      return false;
    } 
    return true;
  }
  
  render(){
    this.state.renderer.render(this.state.scene[this.props.index],this.state.camera[this.state.cameraState]) 
    return (
      <div id="cloudpoint">
        <button onClick={this.chageCamera}>카메라 전환</button>
        <button onClick={this.sceneinit}>카메라 위치 초기화</button>
        <div id ="cp-canvas"></div>
      </div>
    )
  }

  //toolbox
  chageCamera=()=>{
    if(this.state.cameraState===0){
      this.state.cameraState=1
    }else{
      this.state.cameraState=0
    }
    this.sceneinit()
  }
  
  //event handler
  handleResize=(e)=>{
    let size = window.innerHeight;
    if(window.innerWidth<size){
      size=window.innerWidth;
    }
    this.state.renderer.setSize(size,size)
    this.state.renderer.render(this.state.scene[this.props.index],this.state.camera[this.state.cameraState]) 
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
      if(this.state.camera[1].position.z===10){
        this.state.camera[1].position.z=10
      }
    }
    this.setState(this.state)
  }

  handleMousedown=(e)=>{
    if(this.state.cameraState===0){
      this.handleCreateStart(e)
    }else if(this.state.cameraState===1){
      this.state.renderer.domElement.addEventListener('mousemove',this.handleMousemove3D)
    }
  }

  handleMouseup=(e)=>{
    if(this.state.cameraState===0){
      this.handleCreateEnd(e)
    }else if(this.state.cameraState===1){
      this.state.renderer.domElement.removeEventListener('mousemove',this.handleMousemove3D)
    }
  }

  
  handleMousemove3D=(e)=>{
    this.state.scene[this.props.index].rotation.z+=e.movementX*0.01
    this.state.scene[this.props.index].rotation.x+=e.movementY*0.01

    this.setState(this.state)
  }
  
  handleCreateStart =(e)=>{
    const clickStartX = ( e.offsetX / this.state.renderer.domElement.width )-0.5
    const clickStartY = ( e.offsetY / this.state.renderer.domElement.height )-0.5
    
    this.state.mouse = {
      x:clickStartX,
      y:clickStartY
    }

    this.setState(this.state)
  }

  handleCreateEnd=(e)=>{
    const clickEndX = ( e.offsetX / this.state.renderer.domElement.width )-0.5
    const clickEndY = ( e.offsetY / this.state.renderer.domElement.height )-0.5

    const cameraTop = this.state.camera[this.state.cameraState].top
    const cameraZoom  = this.state.camera[this.state.cameraState].zoom
    const cameraPosition = this.state.camera[this.state.cameraState].position

    const x = (this.state.mouse.x+clickEndX)*cameraTop/cameraZoom+cameraPosition.x;
    const y = -(this.state.mouse.y+clickEndY)*cameraTop/cameraZoom+cameraPosition.y;
    const w = Math.abs((this.state.mouse.x-clickEndX)*cameraTop/cameraZoom)
    const h = Math.abs((this.state.mouse.y-clickEndY)*cameraTop/cameraZoom)
    
    if(w===0||h===0)
      return

    const cube = THREECube.createCube(x,y,w*2,h*2)

    this.state.scene[this.props.index].add(cube)
    this.state.obj[this.props.index].push(cube)

    this.setState(this.state)
  }
  //
  sceneinit=()=>{
    this.state.scene[this.props.index].rotation.z=0
    this.state.scene[this.props.index].rotation.x=0
    
    this.setState(this.state)
  }
}

export default CloudPoint
