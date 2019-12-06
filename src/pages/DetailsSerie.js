import React, {Component} from 'react';
import SerieService from '../services/series.service';
import Saison from '../components/Saison';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,faPlus } from '@fortawesome/free-solid-svg-icons';


class UneSerie extends Component{
    constructor(props){
        super (props);
        this.state={
            title: "Liste des saisons",
            serie:null,
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    async componentWillMount(){
        this.state.usercon  ? console.log("") : this.props.history.push('/login')
    }

    async componentDidMount(){
        let id = this.props.match.params.id;
        let response = await SerieService.details(id);
        if(response.ok){
            let data= await response.json();
            this.setState({
                serie:data.serie
            })
        }
    }

    gotoaddsaison(){
        this.props.history.push(`/add-saison/${this.props.match.params.id}`);
    }
        
    retour(){
        this.props.history.push(`/`);
    }

    render(){
        return(

            <div className="container">
                <h1>{this.state.title} {this.state.serie ? this.state.serie.titre : null}</h1>
                    <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titre</th>
                            <th>Numéro</th>
                            {
                                this.state.usercon ? this.state.usercon.role==='admin'?
                                    <th>Actions</th>
                                :
                                    <th>Nombre d'épisode</th>
                                :''
                                } 
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.serie ? 
                            this.state.serie.saison.map((item,index)=>{
                                return(
                                    <Saison key={index} id={this.props.match.params.id} data={item} delete={(id_saison,id_serie)=>this.delete(id_saison,id_serie)}/>
                                )

                            })
                            : null}
                        
                    </tbody>
            </table>
            <div align="center">
                <button className="btn btn-jaune" onClick={()=>this.retour()}><FontAwesomeIcon icon={faChevronLeft} /> Retour</button> 
                {
                    this.state.usercon ? this.state.usercon.role==='admin'?
                        <button className="btn btn-noir" onClick={()=>this.gotoaddsaison()}><FontAwesomeIcon icon={faPlus} /> Ajouter une saison</button>
                    :''
                    :''
                }
            </div> 
        </div>
        )
    }
}
export default UneSerie; 