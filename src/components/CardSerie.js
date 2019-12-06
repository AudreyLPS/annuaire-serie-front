import React, {Component} from 'react';
import imgnotfound from'./../444.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart,faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import SerieService from '../services/series.service';
import UsersService from '../services/users.service';

class CardSerie extends Component{
    constructor(props){
        super(props);
        this.state={
            serie:[],
            favoristrue: 'false',
            favoris:[],
            favorisid:'',
            usercon: JSON.parse(localStorage.getItem('myUser')),
        }
    }

    async componentWillMount(){
            // recuperation de la liste des series
        let response_serie = await SerieService.list();
        if(response_serie.ok){
            let data= await response_serie.json();
            this.setState({serie:data.series})

            // recuperation des details de l'user connecté
            let response_user=await UsersService.details(this.state.usercon._id);
            if(response_user.ok){
                let data_user=await response_user.json();
                this.setState({
                    usercon:data_user.user,
                })               
            }
        }

        // si usercon existe on change this.state.favoris 
        this.state.usercon?this.setState({favoris:this.state.usercon.favoris}):console.log('');
        this.state.favoris.map((favoris)=>{
            return(
            (favoris.id_serie===this.props.data._id )?
                this.setState({favoristrue:true})
                : null
            )})
        }
    
    render(){
        return(
                <div class="tile">
                    
                    <div class="tile__media">
                        {
                            this.state.favoristrue===true?
                                <a onClick={() => this.props.supfavoris(this.props.data._id)}>
                                <FontAwesomeIcon className="jaune" icon={faHeart}/></a>
                            :
                            <a onClick={() => this.props.addfavoris(this.props.data._id)}>
                            <FontAwesomeIcon className="favoris" icon={faHeartBroken} /></a>
                        }
                        <img class="tile__img"  src={imgnotfound} alt=""/>
                    </div>
                    <div class="tile__details" onClick={()=> this.props.goto(this.props.data._id)} >
                        <div class="tile__title"> 
                            {this.props.data.titre}
                        </div>
                    </div>
                </div>
        )  
    }
}
export default CardSerie; 