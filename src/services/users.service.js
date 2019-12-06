const baseUrl ="http://localhost:3003";

class UsersService{
    static async authentification(body){
        let init={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        };
        let call = await fetch(`${baseUrl}/auth`,init);
        return call;
    }

    static async create(body){
        let init={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
            
        };
        
        let call = await fetch(`${baseUrl}/users`,init);
        return call;
    }

    static async delete(id){
        let init={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }
        let call = await fetch(`${baseUrl}/users/${id}`,init);
        return call;
    }

    static async details(id){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/users/${id}`,init);
        return call;
    }

    static async update(id,body){
        let init={
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            }, 
            body:JSON.stringify(body)
        }
        let call = await fetch(`${baseUrl}/users/${id}`,init);
        return call;
    }
        
    static async list(){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/users`,init);
        return call;
     }
     
    static async userfavoris(){
        let init={
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        };
        let call = await fetch(`${baseUrl}/userfavoris`,init);
        return call;
    }
        
    static async addfavoris(id,body){
        let init={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        };
        let call = await fetch(`${baseUrl}/addfavoris/${id}`,init);
        return call;
    }

    static async supfavoris(id_user,id_serie,body){
        let init={
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        };
        let call = await fetch(`${baseUrl}/supfavoris/${id_user}/${id_serie}`,init);
        return call;
    }
}
export default UsersService;