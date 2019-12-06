import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class Saison extends Component{
    constructor(props){
        super(props);
        this.state={
            usercon: JSON.parse(localStorage.getItem('myUser')),
        }
    }

    render(){
        return(
            <tr>
                {
                    this.state.usercon ? this.state.usercon.role==='admin'?
                    <td><Link to={`/saison/${this.props.id}/${this.props.data._id}`}>Gérer les épisodes</Link><br/></td>
                :
                    <td><Link to={`/saison/${this.props.id}/${this.props.data._id}`}>Voir les épisodes</Link><br/></td>
                :''
                }
                <td>{this.props.data.titre}</td>
                <td>{this.props.data.numero}</td>
                {
                    this.state.usercon ? this.state.usercon.role==='admin'?
                    <td><button className="btn btn-danger" onClick={()=> this.props.delete(this.props.data._id,this.props.id)} >
                        <FontAwesomeIcon icon={faTimesCircle} /></button></td>
                :
                    <td>{this.props.data.episode.length}</td>
                :''
                }
                
            </tr>
        )
    }
}
export default Saison; 