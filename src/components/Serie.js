import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle,faPencilAlt } from '@fortawesome/free-solid-svg-icons';


class Serie extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <tr>
                <td>
                    <Link to={`/series/${this.props.data._id}`}>Gérer les saisons</Link>
                </td>
                <td>{this.props.data.titre}</td>
                <td>{this.props.data.synopsis}</td>
                <td>{this.props.data.annee}</td>
                <td>{this.props.data.categorie}</td>
                <td>
                    <button className="btn btn-success" onClick={()=> this.props.update(this.props.data._id)}>
                        <FontAwesomeIcon icon={faPencilAlt} /></button>
                    <text>  </text>  
                    <button className="btn btn-danger" onClick={()=> this.props.delete(this.props.data._id)} >
                        <FontAwesomeIcon icon={faTimesCircle} /></button>
                </td>
            </tr>
        )
            
    }
}
export default Serie; 