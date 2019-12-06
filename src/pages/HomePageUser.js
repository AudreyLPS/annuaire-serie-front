import React, {Component} from 'react';
import CardSerie from '../components/CardSerie';
import SerieService from '../services/series.service' ;
import UsersService from '../services/users.service';

class HomePageUser extends Component{
    constructor(props){
        super (props);
        this.state={
            title: "Liste des series",
            favoris:[],
            serie: [],
            categorie:[],
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    componentWillMount(){
        this.state.usercon  ? console.log("") : this.props.history.push('/login')
    }

    async componentDidMount(){
        let response = await SerieService.list();
        if(response.ok){
            let data= await response.json();
            this.setState({serie:data.series});
            this.state.serie.map((item)=>{
                this.state.categorie.push(item.categorie)
            })
            this.setState({categorie:Array.from(new Set(this.state.categorie))});
        }
    }

    goto(id){
        this.props.history.push(`/series/${id}`);
    }

    async addfavoris(id){
        let body={
            id_serie:id,
        };
        let reponse =await UsersService.addfavoris(this.state.usercon?this.state.usercon._id:'',body);
        
        if(reponse.ok){
            this.setState({
                success:true,
                messageSuccess:"favoris bien ajouter"
            })
        }
        window.location.reload();
    }

    async supfavoris(id_serie){
        let body={
            id_serie:id_serie,
        };
        let reponse =await UsersService.supfavoris(this.state.usercon?this.state.usercon._id:'',id_serie,body);
        
        if(reponse.ok){
            this.setState({
                success:true,
                messageSuccess:"favoris bien supprimer"
            })
        }
        window.location.reload();
    }

    render(){
        return(
        <div className="body_user">
            
                        {
                            this.state.categorie.map((item)=>{
                                return( 
                                    <div className="row__inner"> 
                                        <h4>{item}</h4>
                                        {
                                        this.state.serie.map((serie,indexserie)=>{
                                            
                                            return serie.categorie === item ? 
                                            <CardSerie  supfavoris={(id_serie)=>this.supfavoris(id_serie)} 
                                                        addfavoris={(id)=>this.addfavoris(id)} 
                                                        goto={(id)=>this.goto(id)} key={indexserie} data={serie} /> 
                                            : null

                                        }
                                        )}
                                    </div>
                                )
                            })
                        }
        </div>
        
        )}
}
export default HomePageUser; 
