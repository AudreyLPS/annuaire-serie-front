import React, {Component} from 'react';
import User from '../components/User';
import UsersService from '../services/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faChevronLeft } from '@fortawesome/free-solid-svg-icons';


class Users extends Component{
    constructor(props){
        super (props);
        this.state={
            titre:"Liste des utilisateurs",
            users:[],
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    async componentWillMount(){
        this.state.usercon ? this.state.usercon.role==="admin" ? console.log("") : this.props.history.push('/login') :this.props.history.push('/login')
    
    }
    async componentDidMount(){
        let response = await UsersService.list();

        if(response.ok){
            let data= await response.json();
            this.setState({users:data.users});
        }
    }

    async delete(id){
        let reponse =await UsersService.delete(id);
        if(reponse.ok){
            window.location.reload();
        }
    }

    async update(id){
        this.props.history.push(`/update-user/${id}`);

    }

    gotoadd(){
        this.props.history.push('/new-user');
    }

    retour(){
        this.props.history.push(`/`);
    }

    render(){
        return(
            <div className="container">
                <h1>{this.state.titre}</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Date de Naissance</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                <tbody>
                    {
                        this.state.users.map((item,index)=>{
                            {return(
                                <User key={index} data={item} update={(id)=>this.update(id)} delete={(id)=>this.delete(id)}/>
                            )}

                        })
                    }
                </tbody>
                </table>
            <div align="center">
                <button className="btn btn-jaune" onClick={()=>this.retour()}>
                <FontAwesomeIcon icon={faChevronLeft} /> Retour</button>
                <button className="btn btn-noir" onClick={()=>this.gotoadd()}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter un utilisateur</button>
            </div>
        </div>
    )}
}
export default Users;