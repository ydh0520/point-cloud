import * as THREE from "three";

const create3DCamera=()=>{
    const camera=new THREE.PerspectiveCamera(90,1,0.5,500);
    camera.position.z=40;
    return camera
}

const create2DCamera=()=>{
    const camera = new THREE.OrthographicCamera(-25,25,25,-25,-10,5);
    return camera
}

export default {
    create3DCamera,
    create2DCamera
}