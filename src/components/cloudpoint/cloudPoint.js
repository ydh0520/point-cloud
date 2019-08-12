import React, {Component} from 'react';
import * as THREE from "three"
import THREECamera from "./threeCamera"
import THREECloudPoint from "./threeCloudPoint"
import THREECube from './threeCube'
import CloudPointObjBox from "./cloudPointObjBox"
import './cloudPoint.css'
class CloudPoint extends Component {
  //init state
  constructor(props){
    super(props)

    /*
     *실제 렌더링을 위한 객체이다. 
     *alpha - 투명도 관련 속성
     */
    const renderer = new THREE.WebGLRenderer({
      alpha:true
    })

    /*
     *2D 와 3D 카메라를 사용하며 상황에 맞는 카메라를 사용한다.
     * - 2D : 위에서 본 시점
     * - 3D : 입체감을 위해 사용된다.
     *state의 cameraState에 따라 렌더링 할때 사용한다/
     */
    const camera = []
    camera.push(THREECamera.create2DCamera())
    camera.push(THREECamera.create3DCamera())

    /*
     *점, 선, 물체 등 실제 보여주기 위한 객체들을 저장하기 위해 사용한다.
     *bin파일의 갯수만큼 생성되며 porps의 index에 따라 렌더링 한다.
     */
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

  /* 
   *DOM Element 조작을 위하여 componentDidMount이후에 실행되며 실제 <canvas> Tag를 생성하고 event를 추가한다.
   */
  componentDidMount(){
    //canvas 태그를 추가하기 위해 부모 DOM을 불러온다.
    const rootDom = document.getElementById("cp-canvas")

    //canvas 의 크기를 조정하기 위한 것으 부모 DOM의 크기만큼 조절한다.
    let size = rootDom.clientWidth-15;

    if(size>window.innerHeight-200){
      size=window.innerHeight-200
    }

    this.state.renderer.setSize(size,size) 
    //실제 DOM에 삽입한다.
    rootDom.appendChild(this.state.renderer.domElement)

    //각종 event를 등록한다.
    window.addEventListener('resize',this.handleResize)
    //this.state.renderer.domElemet === <canvas></canvas>
    this.state.renderer.domElement.addEventListener('mousedown',this.handleMousedown)
    this.state.renderer.domElement.addEventListener('mouseup',this.handleMouseup)
    this.state.renderer.domElement.addEventListener('mousewheel',this.handleMousewheel)
    
    //render에 실제 rendering하는 함수
    this.state.renderer.render(this.state.scene[this.props.index],this.state.camera[this.state.cameraState]) 
  }

  //props 또는 stat의 변화에 따라 실행되는 함수들
  componentWillUpdate(nextProps,nextState){
    //폴더가 선택될 경우 해당 bin파일을 통새 scene를 생성한다.
    if(nextProps.dir!==this.props.dir){
      const scene=[]
      const obj=[]

      for(let item in nextProps.binFiles){
        const temp = new THREE.Scene()

        temp.background=new THREE.Color(0x111111)
        //빛이 없으면 물체를 볼수 없다.(점은 보임0)
        temp.add(new THREE.AmbientLight(0x505050,100))
        temp.add(THREECloudPoint.createCloudpoint(nextProps.binFiles[item]))

        scene.push(temp)
        obj.push([])
      }

      this.state.scene=scene
      this.state.obj=obj

      this.setState(this.state)
    }

    //inedx가 변화할 경우 3D카메라 시점을 유지하기 위하여 scene을 해당 각도 만큼 회전시켜 준다.
    if(this.props.index!==nextProps.index){
      this.state.scene[nextProps.index].rotation.z+=this.state.scene[this.props.index].rotation.z
      this.state.scene[nextProps.index].rotation.x+=this.state.scene[this.props.index].rotation.x
      
      this.state.scene[this.props.index].rotation.z=0
      this.state.scene[this.props.index].rotation.x=0
  
      this.setState(this.state)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    //선택된 파일이 없을경우 아무것도 할 필요가 없으므로
    if(nextProps.dir===''){
      return false;
    } 
    return true;
  }
  
  render(){
    //setse의 변화를 적용하여 실제 화면에 렌더링 한다.
    this.state.renderer.render(this.state.scene[this.props.index],this.state.camera[this.state.cameraState]) 
    return (
      <div id="cloudpoint" className="row">
        <div id="toolbox" className="col-12"> 
          <button onClick={this.chageCamera}>카메라 전환</button>
          <button onClick={this.sceneinit}>카메라 위치 초기화</button>
        </div>
        <div id ="cp-canvas" className="col-10 m-0 pr-0"/>
        <div className="col-2 m-0">
          <CloudPointObjBox obj={this.state.obj} index = {this.props.index}/>
        </div>
      </div>
    )
  }

  /***** toolbox 관련 함수 추후 component로 재구성 *****/
  chageCamera=()=>{
    if(this.state.cameraState===0){
      this.state.cameraState=1
    }else{
      this.state.cameraState=0
    }
    this.sceneinit()
  }
  
  /***** event handler 관련 함수 *****/

  //윈도우 크기가 변할경우 csnvas의 크기를 변환시키기 위한 함수로서 창의 크기가 변할때 실행된다.
  handleResize=(e)=>{
    const rootDom = document.getElementById("cp-canvas")

    let size = rootDom.clientWidth-15;
    
    if(size>window.innerHeight-200){
      size=window.innerHeight-200
    }
    this.state.renderer.setSize(size,size)
    this.state.renderer.render(this.state.scene[this.props.index],this.state.camera[this.state.cameraState]) 
  }

  //마우스 휠 관련 event로서 휠의 변화에 따라 확대/축소 한다.
  handleMousewheel=(e)=>{
    //2D의 경우 zoom속성이 3D의 경우 postion을 통해 확대/축소 한다.
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

  /*** 
   *** 마우스 관련 event로서 mousedown -> mousemove -> mouseup 순서대로 이벤트가 발생한다. 
   *** 카메라에 따라 다르게 동작하므로 state의 cameraState를 참고한다.
   ***/ 
  handleMousedown=(e)=>{
    if(this.props.dir==""){
      alert("파일을 선택해 주세요")
    }else if(this.state.cameraState===0){
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

  //3D 카메라의 경우 scene의 회전을 주어 시점을 변경한다.
  // 카메라회전의 경우 계산이 복잡해 진다.
  handleMousemove3D=(e)=>{
    this.state.scene[this.props.index].rotation.z+=e.movementX*0.01
    this.state.scene[this.props.index].rotation.x+=e.movementY*0.01

    this.setState(this.state)
  }
  //2D카메라의 경우 물체를 생성하기 위하여 시작점을 state에 저장한다.
  handleCreateStart =(e)=>{
    const clickStartX = ( e.offsetX / this.state.renderer.domElement.width )-0.5
    const clickStartY = ( e.offsetY / this.state.renderer.domElement.height )-0.5
    
    this.state.mouse = {
      x:clickStartX,
      y:clickStartY
    }

    this.setState(this.state)
  }
  //handleCreateStart에서 저장한 위치와 현재 마우스 위치에 따라 물체를 생성한다.
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
  //회전된 물체를 초기화 하기 위한 함수
  sceneinit=()=>{
    this.state.scene[this.props.index].rotation.z=0
    this.state.scene[this.props.index].rotation.x=0
    
    this.setState(this.state)
  }
}

export default CloudPoint
