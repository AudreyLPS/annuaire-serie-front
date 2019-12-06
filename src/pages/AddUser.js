import React, {Component} from 'react';
import UsersService from '../services/users.service';


class AddUser extends Component{
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
    
    gotoadd(){
    this.props.history.push('/login');
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
            this.props.history.push('/login');
        }
      }
    
    render(){
        return(
            <div>
                <form onSubmit={(e)=>this.submit(e)}>
                    <div className="overlay">
                        <div className="ui-panel login-panel animated bounceInDown">
                            <header>
                                <div className="left logo">
                                    <span>My Serie</span>Directory
                                </div>
                            </header>
        
                            <div className="login-form">
                                <div className="subtitle">Inscription</div>
                                    <input type="text" id="pseudo"  onChange={(e)=>this.handleChange(e)} placeholder="Pseudo"/>
                                    <input type="date" id="ddn" onChange={(e)=>this.handleChange(e)} placeholder="Date de naissance"/>
                                    <input type="email" id="email"  onChange={(e)=>this.handleChange(e)} placeholder="E-mail"/>
                                    <input type="text"  id="mdp" onChange={(e)=>this.handleChange(e)} placeholder="Mot de passe"/> 
                            </div>
                            <footer>
                                <div className="right form-actions">
                                <button className="ui-button inactive login"  onClick={()=>this.gotoadd()}>Connexion</button>
                                    <text>  </text> 
                                <button className="ui-button inactive register" >Valider</button>
                                </div>
                            </footer>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddUser;