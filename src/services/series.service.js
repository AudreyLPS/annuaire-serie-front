// CRED
const baseUrl ="http://localhost:3003";

//const baseUrl = "localhost:3000"
class SerieService{
    
    //Liste
    static async list(){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/series`,init);
        return call;
    }

    //details
    static async details(id){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        console.log('details.js')
        let call = await fetch(`${baseUrl}/series/${id}`,init);
        return call;
    }

    //details saison
    static async detailsSaison(id_serie,id_saison){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/saison/${id_serie}/${id_saison}`,init);
        return call;
    }

    //suppression
    static async delete(id){
        let init={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        let call = await fetch(`${baseUrl}/series/${id}`,init);
        return call;
    }

    //suppression
    static async deleteSaison(id_saison,id_serie){
        let init={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        
        let call = await fetch(`${baseUrl}/saisons/${id_serie}/${id_saison}`,init);
        return call;
    }

    //suppression
    static async deleteEpisode(id_serie,id_saison,id_episode){
        console.log(id_episode,id_saison,id_serie)
        let init={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        
        let call = await fetch(`${baseUrl}/episodes/${id_serie}/${id_saison}/${id_episode}`,init);
        return call;
    }

    //creation
    static async create(body){
        
        let init={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
            
        };
        
        let call = await fetch(`${baseUrl}/series`,init);
        return call;
    }

    //creation de saison
    static async addSaison(id,body){
        
    let init={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
        
    };
    let call = await fetch(`${baseUrl}/series/${id}`,init);
    return call;
}

    //creation de saison
    static async addEpisode(id_serie,id_saison,body){
        
    let init={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(body)
        
    };
    let call = await fetch(`${baseUrl}/serie/${id_serie}/saison/${id_saison}`,init);
    return call;
    }

    //update
    static async update(id,body){
        let init={
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }, 
            body:JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/series/${id}`,init);
        return call;
    }
}
export default SerieService;