import * as THREE from 'three'

function createCube(x,y,w,h){
    const goemetry = new THREE.BoxGeometry(w,h,4);
    
    const material = new THREE.MeshPhysicalMaterial({color:0xff00ff})
    
    //material.wireframe=true;
    
    const mesh = new THREE.Mesh(goemetry,material);

    mesh.position.x+=x;
    mesh.position.y+=y;
    mesh.position.z+=1

    return mesh;
}

export default{
    createCube
};