import React, {Component} from 'react';
import './cloudPointObjBox.css'
class cloudPointObjBox extends Component {
    render(){
        const objBoxList = this.props.obj.map(
            (objPa) => (
                <li key={objPa.uuid} onClick={()=>this.selectObj(objPa.uuid)} style={{background: "rgb("+objPa.material.color["r"]*255+","+objPa.material.color["g"]*255+","+objPa.material.color["b"]*255+",0.5)"}}>
                    <div  className="objBoxes">
                        {objPa.name}
                        <i className="xi-trash-o" onClick={()=>this.deleteObj(objPa.uuid)}></i>
                        <i className="xi-caps" onClick={()=>this.renameObj(objPa.uuid)}></i>
                    </div>
                </li>)
        );
         return (
            <div id="cloudPointObjBox">
               <ul>{objBoxList}</ul>
            </div>
        )
    }
    
    uuidtoIdex=(uuid)=>{
        let index
        for(var i=0;i<this.props.obj.length;i++){
            if(this.props.obj[i].uuid===uuid){
                index=i
            }
        }
        return index;
    }

    selectObj=(uuid)=>{
        let index=this.uuidtoIdex(uuid);
        this.props.callbackControlObjBox(0,index,null)
    }

    deleteObj=(uuid)=>{
        let index=this.uuidtoIdex(uuid);
        this.props.callbackControlObjBox(1,index,null)
    }

    renameObj=(uuid,value)=>{
        let index=this.uuidtoIdex(uuid);
        this.props.callbackControlObjBox(2,index,"rename")
    }
}

export default cloudPointObjBox
