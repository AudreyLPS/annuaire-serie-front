import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

class Episode extends Component{
    constructor(props){
        super(props);
        this.state={
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    componentDidMount(){

    }


    render(){
        return(
            <tr>
                <td>{this.props.data.titre}</td>
                <td>{this.props.data.numero}</td>
                <td>{this.props.data.duree}</td>
                {
                    this.state.usercon ? this.state.usercon.role==='admin'?
                        <td>
                            <button className="btn btn-danger" onClick={()=> this.props.delete(this.props.id_serie,this.props.id_saison,this.props.data._id)} >
                            <FontAwesomeIcon icon={faTimesCircle} /></button>
                        </td>
                        :
                        ''
                        :''
                        }
                
            </tr>
        )
    }
}
export default Episode; 