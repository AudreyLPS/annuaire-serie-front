import css from './style.css';
import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePageAdmin from './pages/HomePageAdmin';
import DetailsSerie from './pages/DetailsSerie';
import AddSerie from './pages/AddSerie';
import AddSaison from './pages/AddSaison';
import DetailsSaison from './pages/DetailsSaison';
import AddEpisode from './pages/AddEpisode';
import UpdateSerie from './pages/UpdateSerie';
import Login from './pages/Login';
import AddUser from './pages/AddUser';
import Users from './pages/Users';
import UpdateUser from './pages/UpdateUser';
import HomePageUser from './pages/HomePageUser';
import NotFoundPage from './pages/NotFoundPage';
import Newuser from './components/Newuser';
import MesFavoris from './pages/MesFavoris';

class App extends Component{

  constructor(props){
    super(props);
    
    this.state={
      usercon: JSON.parse(localStorage.getItem('myUser')),
    }
  }

render(){
  return(
    <BrowserRouter>
      {
        this.state.usercon ? 
        <div>
          <Header/>
          <Route path="/update-serie/:id" exact component={UpdateSerie}/>
          <Route path="/add-saison/:id" exact component={AddSaison}/>
          <Route path="/saison/:id_serie/:id_saison" exact component={DetailsSaison}/>
          <Route path="/add-episode/:id_serie/:id_saison" exact component={AddEpisode}/>
          <Route path="/series/:id" exact component={DetailsSerie}/>
          <Route path="/" exact component={HomePageAdmin}/>
          <Route path="/homeUser" exact component={HomePageUser}/>
          <Route path="/add-serie" exact component={AddSerie}/>
          <Route path="/gestion-user" exact component={Users}/>
          <Route path="/add-user" exact component={AddUser}/>
          <Route path="/new-user" exact component={Newuser}/>
          <Route path="/update-user/:id" exact component={UpdateUser}/>
          <Route path="/favoris" exact component={MesFavoris}/>
          <Route path="/login" exact component={Login}/>
          <Footer/>
        </div>
      :
        <div>
          <Route path="/login" exact component={Login}/>
          <Route path="/404" exact component={NotFoundPage}/>
          <Route path="/add-user" exact component={AddUser}/>
          <Route path="/" exact component={HomePageAdmin}/>
        </div>
      
      }
    </BrowserRouter>
  )
}
  
}

export default App;
