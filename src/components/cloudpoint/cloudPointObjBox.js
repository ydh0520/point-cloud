import React, {Component} from 'react';
import './cloudPointObjBox.css'
class cloudPointObjBox extends Component {
    render(){
        const objBoxList = this.props.obj.map(
            (objPa) => (<li key={objPa.uuid} onClick={(uuid)=>this.selectObj(objPa.uuid)}>
                <div  className="objBoxes" style={{background: "rgb("+objPa.material.color["r"]*255+","+objPa.material.color["g"]*255+","+objPa.material.color["b"]*255+")"}}>{objPa.name}</div>
                </li>)
        );
         return (
            <div id="cloudPointObjBox">
               <ul>{objBoxList}</ul>
            </div>
        )
    }
    
    selectObj(uuid){
        let index;
        for(var i=0;i<this.props.obj.length;i++){
            if(this.props.obj[i].uuid===uuid){
                index=i
            }
        }
    
        this.props.callbackControlObjBox(1,index)
    }
}

export default cloudPointObjBox
