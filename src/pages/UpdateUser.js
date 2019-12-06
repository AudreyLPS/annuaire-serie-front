import React, {Component} from 'react';
import UsersService from '../services/users.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt , faChevronLeft } from '@fortawesome/free-solid-svg-icons';


class UpdateUser extends Component{
    constructor(props){
        super (props);
        this.state={
            title:this.props.pseudo,
            annee:this.props.email,
            synopsis:this.props.ddn,
            categorie:this.props.role,
            mdp:this.props.mdp,
            user:null,
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    componentWillMount(){
        this.state.usercon  ? console.log("") : this.props.history.push('/login')
    
    }

    async componentDidMount(){
        let id = this.props.match.params.id;
        let response = await UsersService.details(id);
        if(response.ok){
            let data= await response.json();
            this.setState({
                user:data
            })
        }
    }
    
    handleChange(e){
    
        this.setState({
            [e.target.id] : e.target.value})
    }

    async submit(e){
        
        e.preventDefault();
        this.setState({success:false})
        let body={
            pseudo:this.state.pseudo,
            email:this.state.email,
            ddn:this.state.ddn,
            role:this.state.role,
            mdp:this.state.mdp,
        };
        let reponse =await UsersService.update(this.props.match.params.id,body);
        
        if(reponse.ok){
            this.setState({
                success:true,
                messageSuccess:"Utilisateur bien modifié"
            })
        }
    }

    retour(){
        // modifier le chemin pour un user
        if(this.state.usercon){
            if(this.state.usercon.role==="admin"){
                this.props.history.push(`/gestion-user`);
            }else{
                this.props.history.push(`/homeUser`);
            }
        }
    }

    render(){
        return(
            
            <div className="container">
                <h1>Modifier un utilisateur</h1>
                <form onSubmit={(e)=>this.submit(e)}>
                <div className="form-group">
                    <label>Pseudo</label>
                    <input type="text" defaultValue={this.state.user ? this.state.user.user.pseudo : null} className="form-control" id="pseudo" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={this.state.user ? this.state.user.user.email : null}className="form-control"  id="email" onChange={(e)=>this.handleChange(e)} />
                </div>
                <div>
                {
                    this.state.usercon ? this.state.usercon.role==="admin"? 
                <div>
                <label>Rôle</label>
                <select class="form-control" name="role" id="role" size="1" onChange={(e)=>this.handleChange(e)}>
                    <option value="">--Please choisir un role--</option>
                    <option value="admin">Administrateur</option>
                    <option value="user">Standard</option>
                </select>
                </div>
                :''
                :''
                }
                </div>
                <div>
                    <label>Date de naissance</label>
                    <input type="date" defaultValue={this.state.user ? this.state.user.user.ddn : null}className="form-control"  id="ddn" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div align="center">
                    <button className="btn btn-jaune" onClick={()=>this.retour()}><FontAwesomeIcon icon={faChevronLeft} /> Retour</button>
                    <button className="btn btn-noir" type="submit" ><FontAwesomeIcon icon={faPencilAlt} /> Modifier</button>
                </div>
                </form>
                {
                    this.state.success ? <p> {this.state.messageSuccess} </p>:null
                }
            </div>
        )
    }
}
export default UpdateUser; 