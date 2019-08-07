import * as THREE from "three";

const create3DCamera=()=>{
    const camera=new THREE.PerspectiveCamera(90,1,2,500);
    camera.position.z=40;
    return camera
}

const create2DCamera=(size)=>{
    const camera = new THREE.OrthographicCamera(size/-20,size/20,size/20,size/-20,-10,5);
    return camera
}

export default {
    create3DCamera,
    create2DCamera
}