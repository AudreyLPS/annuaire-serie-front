import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle,faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class User extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <tr>
                <td>{this.props.data.pseudo}</td>
                <td>{this.props.data.email}</td>
                <td>{this.props.data.ddn.substring(0,10)}</td>
                <td>{this.props.data.role}</td>
                <td>
                    <button className="btn btn-success" onClick={()=> this.props.update(this.props.data._id)}>
                    <FontAwesomeIcon icon={faPencilAlt} /></button>
                    <text>  </text>  
                    <button className="btn btn-danger" onClick={()=> this.props.delete(this.props.data._id)} >
                    <FontAwesomeIcon icon={faTimesCircle} />
                    </button>
                </td>
            </tr>
        )
            
    }
}
export default User; 