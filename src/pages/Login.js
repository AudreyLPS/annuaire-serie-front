import React, {Component} from 'react';
import UsersService from '../services/users.service';

class Login extends Component{
    constructor(props){
        super (props);
        this.state={
            pseudo:'',
            mdp:'',
            messageNoSuccess:''
        }
    }

    handleChange(e){
        this.setState({
            [e.target.id] : e.target.value})
    }

    gotoadd(){
        this.props.history.push('/add-user');
    }

    async submit(e) {
      e.preventDefault();
      let body = {
            email: this.state.email,
            mdp: this.state.mdp,
      };
      let reponse = await UsersService.authentification(body);
      let data=await reponse.json();
      if (reponse.ok) {
        if(data.user !== undefined)  {
            localStorage.setItem('myUser', JSON.stringify(data.user));
            if (data.user.role==='admin'){
                window.location='/';
            }
            if (data.user.role==='user'){
                window.location='/homeUser';
            }
        }
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
                            <div className="subtitle">Connexion</div>
                                <input type="text" onChange={(e)=>this.handleChange(e)} id="email" placeholder="ton-email@hotmail.fr" />
                                    { this.state.success ? <p> {this.state.messageNoSuccess} </p>:null }
                                <input type="password" onChange={(e)=>this.handleChange(e)} id="mdp" placeholder="Mot de passe " />
                        </div>
                        <footer>
                            <div className="right form-actions">             
                                <button className="ui-button inactive login" onClick={()=>this.gotoadd()} >Inscription</button>
                                <text>  </text> 
                                <button type="submit" className="ui-button inactive register" >Connexion</button>
                            </div>
                        </footer>
                    </div>
                </div>
                </form>
            </div>
        )
    }
}
export default Login; 
