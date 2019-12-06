import React, {Component} from 'react';
import SerieService from '../services/series.service';
import Episode from '../components/Episode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronLeft} from '@fortawesome/free-solid-svg-icons';



class DetailsSaison extends Component{
    constructor(props){
        super (props);
        this.state={
            saison:null,
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    async componentWillMount(){
        this.state.usercon ?  console.log("")  :this.props.history.push('/login')
    }

    async componentDidMount(){
        
        let id_serie = this.props.match.params.id_serie;
        let id_saison = this.props.match.params.id_saison;
        let response = await SerieService.detailsSaison(id_serie, id_saison);
        
        if(response.ok){
            let data= await response.json();
            this.setState({
                title:"Liste des épisodes",
                saison:data.saison
                
            })
        }
        }
    
    async delete(id_episode,id_saison,id_serie){
            let reponse =await SerieService.deleteEpisode(id_episode,id_saison,id_serie);
            if(reponse.ok){
                window.location.reload();
            }
        }

    gotoaddepisode(){
            this.props.history.push(`/add-episode/${this.props.match.params.id_serie}/${this.props.match.params.id_saison}`);
            
        }

    retour(){
        this.props.history.push(`/series/${this.props.match.params.id_serie}`);
    }

    render(){
        return(
            <div className="container">
                <h1>{this.state.title} {this.state.saison ? this.state.saison.numero : null}</h1>
                 <table className="table">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Numéro</th>
                        <th>duree</th>
                        {
                            this.state.usercon ? this.state.usercon.role==='admin'?
                            <th>Actions</th>
                        :''
                        :''
                        }
                    </tr>
                </thead>
            <tbody>
                {this.state.saison ? 
                    this.state.saison.episode.map((item,index)=>{
                        return(
                            <Episode key={index}  data={item} id_saison={this.props.match.params.id_saison} id_serie={this.props.match.params.id_serie} delete={(id_serie,id_saison,id_episode)=>this.delete(id_serie,id_saison,id_episode)}/>
                        )

                    })
                : null}
            </tbody>
            </table>
            <div align="center">
                <button className="btn btn-jaune" onClick={()=>this.retour()}><FontAwesomeIcon icon={faChevronLeft} /> Retour</button> 
                {
                    this.state.usercon ? this.state.usercon.role==='admin'?
                        <button className="btn btn-noir"   onClick={()=>this.gotoaddepisode()}><FontAwesomeIcon icon={faPlus} /> Ajouter un épisode</button>
                        :''
                        :''
                }   
            </div>
            </div>
        )
    }
}
export default DetailsSaison; 