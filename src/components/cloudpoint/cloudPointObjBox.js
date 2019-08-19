import React, {Component} from 'react';
import './cloudPointObjBox.css'
class cloudPointObjBox extends Component {
    selectObjBox(event){
    }
    render(){
        var objBoxId = 0
        const objBoxList = this.props.obj.map(
            (objPa) => (<li key={objPa.uuid}>
                <div  className="objBoxes" id={objBoxId++} onClick={this.selectObjBox} style={{background: "rgb("+objPa.material.color["r"]*255+","+objPa.material.color["g"]*255+","+objPa.material.color["b"]*255+")"}}>{objPa.name}</div>
                </li>)
        );
         return (
            <div id="cloudPointObjBox">
               <ul>{objBoxList}</ul>
            </div>
        )
    }
}

export default cloudPointObjBox
