import React, {Component} from 'react';
import SerieService from '../services/series.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt,faChevronLeft } from '@fortawesome/free-solid-svg-icons';


class UpdateSerie extends Component{
    constructor(props){
        super (props);

        // base de données interne
        this.state={
            title:this.props.title,
            annee:this.props.annee,
            synopsis:this.props.synopsis,
            categorie:this.props.categorie,
            serie:null,
            usercon: JSON.parse(localStorage.getItem('myUser'))
        
        
        }
    }

    componentWillMount(){
        this.state.usercon ? this.state.usercon.role==="admin" ? console.log("") : this.props.history.push('/login') :this.props.history.push('/login')
    }

    async componentDidMount(){
        let id = this.props.match.params.id;
        let response = await SerieService.details(id);
        if(response.ok){
            let data= await response.json();
            this.setState({
                serie:data
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
            titre:this.state.title,
            annee:this.state.annee,
            synopsis:this.state.synopsis,
            categorie:this.state.categorie
        };
        let reponse =await SerieService.update(this.props.match.params.id,body);
        
        if(reponse.ok){
            this.setState({
                success:true,
                messageSuccess:"Serie bien modifiée"
            })
        }


    }

    retour(){
        this.props.history.push(`/`);
    }

    render(){
        return(
            
            <div className="container">
                <h1>Modifier une serie</h1>
                <form onSubmit={(e)=>this.submit(e)}>
                <div className="form-group">
                    <label>Titre</label>
                    <input type="text" defaultValue={this.state.serie ? this.state.serie.serie.titre : null} className="form-control" id="title" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-group">
                    <label>Synopsis</label>
                    <input type="text" defaultValue={this.state.serie ? this.state.serie.serie.synopsis : null}className="form-control"  id="synopsis" onChange={(e)=>this.handleChange(e)} />
                </div>
                <div>
                <label>Catégorie</label>
                <select class="form-control" name="categorie" id="categorie" size="1" onChange={(e)=>this.handleChange(e)}>
                    <option value="">--Please choisir une catégorie--</option>
                    <option value="Horreur">Horreur</option>
                    <option value="Policier">Policier</option>
                    <option value="Enfant">Enfant</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Medecin">Médecin</option>
                    <option value="Action">Action</option>
                </select>
                </div>
                <div>
                    <label>Année</label>
                    <input type="text" defaultValue={this.state.serie ? this.state.serie.serie.annee : null}className="form-control"  id="annee" onChange={(e)=>this.handleChange(e)}/>
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
export default UpdateSerie; 