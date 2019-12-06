import React, {Component} from 'react';
import UsersService from '../services/users.service';


class Newuser extends Component{
    constructor(props){
        super (props);
        this.state={
            email:'',
            mdp:'',
            formErrors: {
                email: '', 
                mdp: '',
                usercon: JSON.parse(localStorage.getItem('myUser'))
            },
           
        }
    }

    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value})
    }


    async submit(e) {
        e.preventDefault();
        this.setState({success:false})
        let body={
            pseudo:this.state.pseudo,
            email:this.state.email,
            role:'user',
            ddn:this.state.ddn,
            mdp:this.state.mdp
        };
        let reponse = await UsersService.create(body);
        if (reponse.ok) {
            this.setState({
                success:true,
                messageSuccess:"User bien crée"
            })
                this.props.history.push('/gestion-user');
            }
      }
    
    retour(){
        this.props.history.push(`/gestion-user`);
    }
 
    render(){
        return(
            <form onSubmit={(e)=>this.submit(e)}>
                <div className="form-group">
                    <label>Pseudo</label>
                    <input className="form-control" id="pseudo"  onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-group">
                    <label>Date de naissance</label>
                    <input type="date" className="form-control" id="ddn" onChange={(e)=>this.handleChange(e)}/>
                </div>
                
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" id="email"  onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-group">
                <label>Rôle</label>
                    <select class="form-control" name="role" id="role" size="1" onChange={(e)=>this.handleChange(e)}>
                        <option value="">--Please choisir un role--</option>
                        <option value="admin">Administrateur</option>
                        <option value="user">Standard</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Mot de Passe</label>
                    <input type="text" className="form-control" id="mdp" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <button className="btn btn-primary" onClick={()=>this.retour()}>Retour</button>  
                <button className="btn btn-danger">Inscription</button>
                </form>
        )
    }
}
export default Newuser;
