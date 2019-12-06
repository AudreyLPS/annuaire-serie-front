import React, {Component} from 'react';
import SerieService from '../services/series.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faChevronLeft } from '@fortawesome/free-solid-svg-icons';



class AddSaison extends Component{
    constructor(props){
        super (props);
        this.state={
            title:'',
            numero:'',
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
            numero:this.state.numero
        };
        let reponse =await SerieService.addSaison(this.props.match.params.id,body);
        let id=this.props.match.params.id;
        if(reponse.ok){
            this.setState({
                success:true,
                messageSuccess:"Saison bien crée"
            })
            this.props.history.push(`/series/${id}`);
        }
    }

    retour(){
        this.props.history.push(`/series/${this.props.match.params.id}`);
    }

    render(){
        return(
            <div className="container">
                <h1>Ajouter une saison</h1>
                <form onSubmit={(e)=>this.submit(e)}>
                <div className="form-group">
                    <label>Titre</label>
                    <input type="text" className="form-control" id="title" onChange={(e)=>this.handleChange(e)}/>
                </div>
                <div className="form-group">
                    <label>Numéro</label>
                    <input type="text" className="form-control"  id="numero" onChange={(e)=>this.handleChange(e)} />
                </div>      
                <div align="center">
                    <button className="btn btn-jaune" onClick={()=>this.retour()}><FontAwesomeIcon icon={faChevronLeft} /> Retour</button>       
                    <button className="btn btn-noir" type="submit" ><FontAwesomeIcon icon={faPlus} /> Ajouter une saison</button>
                </div>
                </form>
                {
                    this.state.success ? <p> {this.state.messageSuccess} </p>:null
                }
            </div>
        )
    }
}

export default AddSaison; 