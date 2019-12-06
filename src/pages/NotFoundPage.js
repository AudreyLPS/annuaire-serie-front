import React, {Component} from 'react';
import quatre from './../404.png';


class NotFoundPage extends Component{
    constructor(props){
        super (props);
        this.state={
            title: "Liste des series",
            serie: [],
            categorie:[],
        }
    }

    render(){
        return(
                <img className="quatrelogo" src={quatre}></img>
        )}
}
export default NotFoundPage;


