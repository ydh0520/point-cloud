import * as THREE from 'three'

function createCube(x,y,w,h){
    const goemetry = new THREE.BoxGeometry(w,h,1.5);t
    
    const randomColor = Math.floor(Math.random() * 16777215)


    const material = new THREE.MeshPhysicalMaterial({color:new THREE.Color(randomColor)})
    material.transparent=true
    material.opacity=0.7

    const lineframe = new THREE.WireframeGeometry(goemetry)
    const line=new THREE.LineSegments(lineframe)
    line.material.color=new THREE.Color(0xffffff)


    const mesh = new THREE.Mesh(goemetry,material)
    mesh.add(line)

    mesh.position.x+=x;
    mesh.position.y+=y;
    mesh.position.z-=0.3

    return mesh;
}

function createMyCar(){
    const goemetry = new THREE.BoxGeometry(2.8,1.2,0.5);
    const material = new THREE.MeshPhysicalMaterial({color:0xffffff})
    const mesh = new THREE.Mesh(goemetry,material);

    const lineframe = new THREE.WireframeGeometry(goemetry)
    const line=new THREE.LineSegments(lineframe)
    line.material.color=new THREE.Color(0x000000)
    mesh.add(line)
    
    mesh.position.x+=0.7
    mesh.position.z-=0.25

    return mesh;
}

export default{
    createCube,
    createMyCar
};