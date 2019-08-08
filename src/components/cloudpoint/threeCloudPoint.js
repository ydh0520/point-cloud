import * as THREE from "three";

function createCloudpoint(data){
    
    const geometry  = new THREE.Geometry();

    for(let i=0;i<data.length;i+=4){
        if(data[i]<1&&data[i]>-1&&data[i+1]<1&&data[i+1]>-1)
            continue
    
        geometry.vertices.push(new THREE.Vector3(data[i],data[i+1],data[i+2]));
        //const colorvalue = (data[i+2]+5)*0.1
        if(data[i+2]>0){
            geometry.colors.push(new THREE.Color(0.8,1.18-0.3*data[i+2],0.3))
        }else{
            geometry.colors.push(new THREE.Color(0.3*data[i+2]-1.18,0.8,0.3))
        }
    }
    const material = new THREE.PointsMaterial( { size: 0.01, vertexColors: THREE.VertexColors } );

    const mesh =  new THREE.Points();
    mesh.geometry=geometry;
    mesh.material=material;

    return mesh
}

export default{createCloudpoint}