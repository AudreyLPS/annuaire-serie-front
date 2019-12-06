import React, {Component} from 'react';
import CardSerie from '../components/CardSerie';
import UsersService from '../services/users.service' ;
import SerieService from '../services/series.service';

class MesFavoris extends Component{
    constructor(props){
        super (props);
        this.state={
            title: "Liste des series",
            serie: [],
            favoris:[],
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    async componentWillMount(){

        let response_serie = await SerieService.list();
        if(response_serie.ok){
            let data= await response_serie.json();
            this.setState({serie:data.series})
            let response_user=await UsersService.details(this.state.usercon._id);
            if(response_user.ok){
                let data_user=await response_user.json();
                this.setState({usercon:data_user.user})
            }
        }
        this.state.usercon?this.setState({favoris:this.state.usercon.favoris}):console.log('');
    }

     componentDidMount(){
 
    }
    goto(id){
        this.props.history.push(`/series/${id}`);
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
            <div className="row__inner"> 
                <h4>Mes favoris</h4>
                    {
                    this.state.favoris.map((item)=>{
                        return( 
                            this.state.serie.map((serie,indexserie)=>{
                                return serie._id == item.id_serie ? 
                                 <CardSerie  supfavoris={(id_serie)=>this.supfavoris(id_serie)} 
                                            addfavoris={(id)=>this.addfavoris(id)} 
                                            goto={(id)=>this.goto(id)} key={indexserie} data={serie} /> 
                                :null
                            })
                        )
                    })
                    }
            </div>
        </div>
        )
    }
}
export default MesFavoris; 
