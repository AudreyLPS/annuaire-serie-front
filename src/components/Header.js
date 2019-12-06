import React, {Component} from 'react';
import {Link} from 'react-router-dom';
  
import logo from './../MSD_logo.png';

class Header extends Component{
    constructor(props){
        super (props);
        this.state={
          usercon: JSON.parse(localStorage.getItem('myUser')),
          isAdmin:false
      }
    }

    componentWillReceiveProps(){
      if(this.state.usercon){
        if(this.state.usercon.role==="admin"){
          this.setState({
            isAdmin:true
          })
        }
      }
    }

    async componentDidMount(){
      if(this.state.usercon){
        if(this.state.usercon.role==="admin"){
          this.setState({
            isAdmin:true
          })
        }
      }
    }

    deco(){
      window.location='/login';
      localStorage.clear()
    }

    render(){
        return(
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                  <img className="img_logo" src={logo}/>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      {
                        this.state.isAdmin?
                        <div> <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to={'/'}>Accueil</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={'/add-serie'}>Ajouter une série</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={'/gestion-user'}>Gérer les utilisateurs</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={`/update-user/${this.state.usercon?this.state.usercon._id:''}`}>Gérer son compte</Link>
                          </li>
                      <li className="nav-item">
                        <a className="nav-link" onClick={()=>this.deco()} >Déconnexion</a>
                      </li>
                      </ul>
                        </div>
                        :<div>
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <Link className="nav-link" to={'/homeUser'}>Accueil</Link>
                          </li>
                          <li className="nav-item active">
                            <Link className="nav-link" to={'/favoris'}>Mes favoris</Link>
                          </li>
                          <li className="nav-item">
                            <Link className="nav-link" to={`/update-user/${this.state.usercon?this.state.usercon._id:''}`}>Gérer son compte</Link>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" onClick={()=>this.deco()} >Déconnexion</a>
                          </li>
                          </ul>
                        </div>
                      }
                  </div>
                  </nav>
          )
    }
}
export default Header; 