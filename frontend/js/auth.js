import { API_URL } from "./config.js";


async function login(username,password){
    try {
        const response = await fetch(`${API_URL}token/`,{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({username,password}),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token',data.access);
            return "Connexion réussie" ;
        }else{
            return "Identifiants incorrects"
        }

    } catch (erreur) {
        return "Erreur de connexion au serveur" ; 
    }
}

function logout(){
    localStorage.removeItem('token');
}


function isAuthenticated(){
    const token = localStorage.getItem('token');
    return token != null ;
}

function getToken(){
    const token = localStorage.getItem('token');
    return token ;
}

export {login , logout , isAuthenticated , getToken}