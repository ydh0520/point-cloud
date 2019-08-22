import React, {Component} from 'react';
import './cloudPointObjBox.css'
class cloudPointObjBox extends Component {
    render(){
        const objBoxList = this.props.obj.map(
            (objPa) => (
                <li id={"list"+objPa.uuid}key={objPa.uuid} onClick={()=>this.selectObj(objPa.uuid,"list"+objPa.uuid)} style={{background: "rgb("+objPa.material.color["r"]*255+","+objPa.material.color["g"]*255+","+objPa.material.color["b"]*255+",0.5)"}}>
                    <div  className="objBoxes">
                        <i className="xi-trash-o" onClick={()=>this.deleteObj(objPa.uuid)}></i>
                        <i className="xi-caps" onClick={()=>this.showRenameField("objRenameField" + objPa.uuid)}></i>
                        <p id={"objPaName" + objPa.uuid}>{objPa.name}</p>
                        
                        <div className="objRenameField" id={"objRenameField" + objPa.uuid}>
                        <input type="text" id={"objRenameFieldText" + objPa.uuid}/>
                        <button onClick={()=>this.renameObj(objPa.uuid,"objRenameFieldText" + objPa.uuid,"objRenameField" + objPa.uuid)}>Done</button>
                        </div>
                    </div>
                </li>)
        );
         return (
            <div id="cloudPointObjBox">
               <ul id="cloudPointObjBoxUl">{objBoxList}</ul>
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

    selectObj=(uuid,selectListId)=>{
        var listObj = document.getElementById("cloudPointObjBoxUl").children
        for(var i = 0; i < listObj.length; i++){
            console.log(listObj[i])
            listObj[i].style.border = '0px solid'
        }
        document.getElementById(selectListId).style.border = '3px dotted'
        let index=this.uuidtoIdex(uuid);
        this.props.callbackControlObjBox(0,index,null)
    }

    deleteObj=(uuid)=>{
        let index=this.uuidtoIdex(uuid);
        this.props.callbackControlObjBox(1,index,null)
    }

    showRenameField=(renameFieldId)=>{
        document.getElementById(renameFieldId).style.display="block"
        
    }

    renameObj=(uuid,textFieldId,renameFieldId)=>{
        let index=this.uuidtoIdex(uuid);
        const renameValue = document.getElementById(textFieldId).value
        console.log(renameValue)
        this.props.callbackControlObjBox(2,index,renameValue)
        document.getElementById(renameFieldId).style.display = "none"
    }
}

export default cloudPointObjBox
