import React, {Component} from 'react';
import Serie from '../components/Serie';
import SerieService from '../services/series.service' ;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class HomePageAdmin extends Component{
    constructor(props){
        super (props);
        this.state={
            title: "Liste des series",
            serie: [],
            usercon: JSON.parse(localStorage.getItem('myUser'))
        }
    }

    componentWillMount(){
        this.state.usercon ? this.state.usercon.role==="admin" ? this.props.history.push('/') : this.props.history.push('/homeUser'):this.props.history.push('/login')
    }

    async componentDidMount(){
        
        //la page a charger sa vue
        let response = await SerieService.list();
        if(response.ok){
            //la reponse est de type 200
            let data= await response.json();
            this.setState({serie:data.series});
        }
    }
   
    gotoadd(){
        
        this.props.history.push('/add-serie');
    }

    async delete(id){
        let reponse =await SerieService.delete(id);
        if(reponse.ok){
            window.location.reload();
        }
    }

    async update(id){
        this.props.history.push(`/update-serie/${id}`);

    }

    render(){
        return(

            <div className="container">
                
            <h1>{this.state.title}</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Titre</th>
                        <th>Synopsis</th>
                        <th>Année</th>
                        <th>Catégorie</th>
                        <th>Actions</th>
                    </tr>
                </thead>
            <tbody>
                {
                    this.state.serie.map((item,index)=>{
                        return(
                            <Serie key={index} data={item} update={(id)=>this.update(id)} delete={(id)=>this.delete(id)}/>
                        )

                    })
                }
            </tbody>
            </table>
            <div align="center">
                <button className="btn btn-noir" onClick={()=>this.gotoadd()}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter une serie
                </button>
            </div>    
        </div>
        )
        
    }
}
export default HomePageAdmin; 