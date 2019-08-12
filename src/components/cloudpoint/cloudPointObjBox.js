import React, {Component} from 'react';

class cloudPointObjBox extends Component {

    render(){
        console.log(this.props.obj[this.props.index])
        return (
            <div id="cloudPointObjBox">
                {JSON.stringify(this.props.obj[this.props.index])}
            </div>
        )
    }
}

export default cloudPointObjBox
