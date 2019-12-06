import React, {Component} from 'react';
import SerieService from '../services/series.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

class AddEpisode extends Component{
    constructor(props){
        super (props);
        this.state={
            title:'',
            numero:'',
            duree:'',
            userWatch:[],
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    componentWillMount(){
        this.state.usercon ? this.state.usercon.role==="admin" ? console.log("") : this.props.history.push('/login') :this.props.history.push('/login')
    }

    handleChange(e){
        
        this.setState({
            [e.target.id] : e.target.value})
    }

    async submit(e){
        e.preventDefault();
        this.setState({success:false})
        let body={
            titre:this.state.title,
            numero:this.state.numero,
            duree:this.state.duree
        };
        let reponse =await SerieService.addEpisode(this.props.match.params.id_serie,this.props.match.params.id_saison,body);
        let id_serie=this.props.match.params.id_serie;
        let id_saison=this.props.match.params.id_saison;
        if(reponse.ok){
            this.setState({
                success:true,
                messageSuccess:"Episode bien crée"
                
            })
            this.props.history.push(`/saison/${id_serie}/${id_saison}`);
        }
    }

    retour(){
        this.props.history.push(`/saison/${this.props.match.params.id_serie}/${this.props.match.params.id_saison}`);
    }

    render(){
        return(
            <div className="container">
                <h1>Ajouter un episode</h1>
                <form onSubmit={(e)=>this.submit(e)}>
                <div className="form-group">
                    <label>Titre</label>
                    <input type="text" className="form-control" id="title" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-group">
                    <label>Numéro</label>
                    <input type="text" className="form-control" id="numero" onChange={(e)=>this.handleChange(e)} />
                </div>        
                <div className="form-group">
                    <label>Durée de l'épisode</label>
                    <input type="text" className="form-control" id="duree" onChange={(e)=>this.handleChange(e)} />
                </div>     
                <div align="center">
                    <button className="btn btn-jaune" onClick={()=>this.retour()}><FontAwesomeIcon icon={faChevronLeft} /> Retour</button>
                    <button className="btn btn-noir" type="submit">Ajouter un episode</button>
                </div>
                </form>
                
            </div>
        )
        
    }
}
export default AddEpisode; 